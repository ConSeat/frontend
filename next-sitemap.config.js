/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://concertseat.site',
  generateRobotsTxt: true,
  exclude: ['/signin', '/mypage'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/signin', '/mypage'],
      },
    ],
  },
};
