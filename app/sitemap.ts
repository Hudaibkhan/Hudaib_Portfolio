import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hudaib-portfolio.vercel.app';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // For now, return static pages only
  // If you add individual project pages later, you can fetch projects here
  // and add them to the sitemap dynamically
  try {
    // Uncomment this when you have individual project pages:
    // const projects = await getProjects();
    // const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    //   url: `${baseUrl}/project/${project.slug}`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // }));
    // return [...staticPages, ...projectPages];

    return staticPages;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
