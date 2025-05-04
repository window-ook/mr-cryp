export default async function extractMarketSituation(browser) {
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(3000);
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

  await page.goto('https://www.tokenpost.kr/news/market', {
    waitUntil: 'domcontentloaded',
    timeout: 4000,
  });

  await page.waitForSelector('div.list_left_item .list_left_item_article', {
    visible: true,
    timeout: 3000,
  });

  const data = await page.evaluate(() => {
    try {
      const categoryItems = document.querySelectorAll(
        'div.list_left_item .list_left_item_article',
      );

      const situations = [];

      categoryItems.forEach(item => {
        try {
          // 로고
          const imageElement = item.querySelector('.list_item_image a');
          const imageUrl = imageElement
            ? imageElement.querySelector('img')
              ? imageElement.querySelector('img').src
              : null
            : null;

          // 제목
          const textElement = item.querySelector('.list_item_title a');
          const title = textElement ? textElement.textContent.trim() : '';

          // URL
          const url = textElement
            ? textElement.href
            : imageElement
              ? imageElement.href
              : '';

          if (title || url) {
            situations.push({
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

      return situations;
    } catch (e) {
      console.error('데이터 추출 중 오류:', e);
      return null;
    }
  });

  return data;
}
