export default async function handler(req, res) {
  const staticRoutes = [
    {
      url: 'https://mr-cryp.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://mr-cryp.vercel.app/home',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://mr-cryp.vercel.app/vision',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://mr-cryp.vercel.app/trade',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://mr-cryp.vercel.app/trade/tradeHistory',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://mr-cryp.vercel.app/trade/orderbook',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://mr-cryp.vercel.app/trade/chart',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...staticRoutes]
        .map(
          ({ url, lastModified, changeFrequency, priority }) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${lastModified}</lastmod>
          <changefreq>${changeFrequency || 'daily'}</changefreq>
          <priority>${priority || 0.5}</priority>
        </url>
      `,
        )
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}
