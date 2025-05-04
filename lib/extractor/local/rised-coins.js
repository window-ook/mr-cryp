export default async function extractRisedCoins(browser) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(3000);
  await page.setRequestInterception(true);

  page.on('request', request => {
    const blockedResourceTypes = ['media', 'font'];
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
    timeout: 4000,
  });

  await page.waitForSelector(
    'table.BasicTable.CryptNewsTable.CryptNewsTable--Period',
    { visible: true, timeout: 3000 },
  );

  await page.waitForSelector('[class*="MoreBtn"]', {
    visible: true,
    timeout: 3000,
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

          // 마켓 코드
          const marketCell = row.querySelector('td:nth-child(2)');
          const market = marketCell?.textContent?.trim() || '';

          // 상승률 데이터
          const periodCells = Array.from(row.querySelectorAll('td')).slice(2);

          return {
            name: coinName,
            marketCode: market,
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
      console.error('데이터 추출 중 오류:', e);
      return null;
    }
  });

  return data;
}
