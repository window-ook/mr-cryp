import crawlArticles from '@/lib/extractor/local/articles';
import crawlRisedCoins from '@/lib/extractor/local/rised-coins';
import crawlMarketSituation from '@/lib/extractor/local/situation';
import puppeteer from 'puppeteer';

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

    // 병렬로 크롤링 실행
    const [articlesData, marketData, coinData] = await Promise.all([
      crawlArticles(browser),
      crawlMarketSituation(browser),
      crawlRisedCoins(browser),
    ]);

    return res.status(200).json({
      status: 200,
      data: {
        articles: Array.isArray(articlesData) ? articlesData : null,
        marketSituation: Array.isArray(marketData) ? marketData : null,
        coins: Array.isArray(coinData) ? coinData : null,
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
    if (browser) {
      await browser.close();
    }
  }
}
