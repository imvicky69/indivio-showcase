/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://indivio.in',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/payment-status', '/payment-page'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/payment-status', '/payment-page'],
      },
    ],
  },
};
