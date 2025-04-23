import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: '메서드가 올바르지 않습니다.' });

  let browser = null;

  try {
    const executablePath = await chromium.executablePath;

    browser = await puppeteerCore.launch({
      defaultViewport: chromium.defaultViewport,
      headless: true,
      args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
      executablePath,
    });

    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(30000);
    await page.setRequestInterception(true);

    page.on('request', request => {
      const blockedResourceTypes = ['image', 'media', 'font', 'stylesheet'];
      const skipUrls = [
        'googleapis',
        'gstatic',
        'analytics',
        'facebook',
        'twitter',
      ];
      const url = request.url();

      if (
        blockedResourceTypes.includes(request.resourceType()) &&
        skipUrls.some(skipUrl => url.includes(skipUrl))
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto('https://www.tokenpost.kr/', {
      waitUntil: 'domcontentloaded',
      timeout: 10000,
    });

    await page.waitForSelector('div.main_news_category .category_item', {
      visible: true,
      timeout: 10000,
    });

    const data = await page.evaluate(() => {
      try {
        const categoryItems = document.querySelectorAll(
          'div.main_news_category .category_item',
        );

        const articles = [];

        categoryItems.forEach(item => {
          try {
            // 로고
            const imageElement = item.querySelector('.category_item_image a');
            const imageUrl = imageElement
              ? imageElement.querySelector('img')
                ? imageElement.querySelector('img').src
                : null
              : null;

            // 제목
            const textElement = item.querySelector('.category_item_text a');
            const title = textElement ? textElement.textContent.trim() : '';

            // URL
            const url = textElement
              ? textElement.href
              : imageElement
                ? imageElement.href
                : '';

            if (title || url) {
              articles.push({
                title,
                url,
                imageUrl,
                timestamp: new Date().toISOString(),
              });
            }
          } catch (itemError) {
            console.error('아이템 처리 중 오류:', itemError);
          }
        });

        return articles;
      } catch (e) {
        console.error('데이터 추출 중 오류:', e);
        return { error: e.toString() };
      }
    });

    if (browser) {
      await browser.close();
      browser = null;
    }

    return res.status(200).json({
      status: 200,
      data: data,
      count: Array.isArray(data) ? data.length : 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('코인 기사 fetch error:', error);

    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error('브라우저 종료 중 오류:', e);
      }
      browser = null;
    }

    return res.status(500).json({
      status: 500,
      error: error.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
    });
  }
}
