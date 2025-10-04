import prisma from '../config/database';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = async (baseUrl: string): Promise<string> => {
  const urls: SitemapUrl[] = [];

  // Static pages
  urls.push({
    loc: baseUrl,
    changefreq: 'daily',
    priority: 1.0,
  });

  urls.push({
    loc: `${baseUrl}/posts`,
    changefreq: 'hourly',
    priority: 0.9,
  });

  urls.push({
    loc: `${baseUrl}/projects`,
    changefreq: 'hourly',
    priority: 0.9,
  });

  urls.push({
    loc: `${baseUrl}/forum`,
    changefreq: 'hourly',
    priority: 0.8,
  });

  // Dynamic pages - Posts
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 1000,
  });

  posts.forEach((post) => {
    urls.push({
      loc: `${baseUrl}/posts/${post.slug}`,
      lastmod: post.updatedAt.toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    });
  });

  // Dynamic pages - Projects
  const projects = await prisma.project.findMany({
    where: { isPrivate: false },
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 1000,
  });

  projects.forEach((project) => {
    urls.push({
      loc: `${baseUrl}/projects/${project.slug}`,
      lastmod: project.updatedAt.toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    });
  });

  // Dynamic pages - Users
  const users = await prisma.user.findMany({
    select: {
      username: true,
      updatedAt: true,
    },
    orderBy: { reputation: 'desc' },
    take: 500,
  });

  users.forEach((user) => {
    urls.push({
      loc: `${baseUrl}/profile/${user.username}`,
      lastmod: user.updatedAt.toISOString(),
      changefreq: 'weekly',
      priority: 0.6,
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
};
