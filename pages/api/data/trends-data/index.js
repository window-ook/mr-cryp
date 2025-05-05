import extractArticles from '@/lib/extractor/local/articles';
import extractRisedCoins from '@/lib/extractor/local/rised-coins';
import extractMarketSituation from '@/lib/extractor/local/situation';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: '메서드가 올바르지 않습니다.' });

  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1366, height: 768 },
      headless: true,
    });

    const [articlesData, marketData, coinData] = await Promise.all([
      extractArticles(browser),
      extractMarketSituation(browser),
      extractRisedCoins(browser),
    ]);

    // if (coinData) {
    //   const mockDir = path.join(process.cwd(), 'public', 'data', 'mock');
    //   if (!fs.existsSync(mockDir)) {
    //     fs.mkdirSync(mockDir, { recursive: true });
    //   }
    //   fs.writeFileSync(
    //     path.join(mockDir, 'top-rised-coins.json'),
    //     JSON.stringify(coinData, null, 2),
    //   );
    // }

    return res.status(200).json({
      status: 200,
      data: {
        marketSituation: Array.isArray(marketData) ? marketData : null,
        topic: Array.isArray(articlesData) ? articlesData : null,
        topRisedCoins: Array.isArray(coinData) ? coinData : null,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('데이터 fetch error:', error);
    return res.status(500).json({
      status: 500,
      error: error.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
    });
  } finally {
    if (browser) await browser.close();
  }
}
