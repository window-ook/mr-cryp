import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: '메서드가 올바르지 않습니다.' });

  let browser = null;

  try {
    browser = await puppeteer.launch({
      defaultViewport: { width: 1366, height: 768 },
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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

    await page.goto('https://upbit.com/trends', {
      waitUntil: 'domcontentloaded',
      timeout: 10000,
    });

    await page.waitForSelector(
      'table.BasicTable.CryptNewsTable.CryptNewsTable--Period',
      { visible: true, timeout: 10000 },
    );

    await page.waitForSelector('[class*="MoreBtn"]', {
      visible: true,
      timeout: 10000,
    });

    let clickSuccess = false;
    if (!clickSuccess) {
      const selectors = ['[class*="MoreBtn"]'];

      for (const selector of selectors) {
        try {
          await page.waitForSelector(selector, { timeout: 1000 });
          await page.click(selector);
          clickSuccess = true;
          console.log(`선택자 '${selector}'로 클릭 성공`);
          break;
        } catch (e) {
          console.log(`선택자 '${selector}'로 클릭 실패:`, e.message);
        }
      }
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = await page.evaluate(() => {
      try {
        const table = document.querySelector(
          'table.BasicTable.CryptNewsTable.CryptNewsTable--Period',
        );

        const rows = table?.querySelectorAll('tbody tr');

        return Array.from(rows)
          .map(row => {
            // 코인 이름
            const nameCell = row.querySelector('td:first-child');
            const coinName =
              nameCell?.querySelector('a')?.textContent?.trim() || '';

            // 코드
            const marketCell = row.querySelector('td:nth-child(2)');
            const market = marketCell?.textContent?.trim() || '';

            // 상승률 데이터
            const periodCells = Array.from(row.querySelectorAll('td')).slice(2);

            return {
              name: coinName,
              market: market,
              periods: {
                oneWeek: periodCells[0]?.textContent?.trim() || '',
                oneMonth: periodCells[1]?.textContent?.trim() || '',
                threeMonths: periodCells[2]?.textContent?.trim() || '',
                sixMonths: periodCells[3]?.textContent?.trim() || '',
                oneYear: periodCells[4]?.textContent?.trim() || '',
              },
            };
          })
          .filter(item => item.name && item.name !== '');
      } catch (e) {
        return { evalError: e.toString() };
      }
    });

    await browser.close();
    browser = null;

    return res.status(200).json({
      status: 200,
      data,
      count: Array.isArray(data) ? data.length : 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('기간별 상승률 fetch error:', error);

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
