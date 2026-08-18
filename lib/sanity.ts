import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { projectsQuery, skillsQuery, aboutQuery } from './sanity.queries';
import { Project, Skill, AboutData } from './types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null;

const imageBuilder = projectId
  ? createImageUrlBuilder({
      projectId,
      dataset,
    })
  : null;

export const urlFor = (source: Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]) => {
  if (!imageBuilder || !source) return null;
  return imageBuilder.image(source);
};

/**
 * Fetch projects directly from Sanity CMS
 */
export async function getProjects(): Promise<Project[]> {
  if (!client) return [];
  try {
    const data = await client.fetch<Project[]>(projectsQuery);
    return data || [];
  } catch (error) {
    console.error('Failed to fetch projects from Sanity:', error);
    return [];
  }
}

/**
 * Fetch skills directly from Sanity CMS
 */
export async function getSkills(): Promise<Skill[]> {
  if (!client) return [];
  try {
    const data = await client.fetch<Skill[]>(skillsQuery);
    return data || [];
  } catch (error) {
    console.error('Failed to fetch skills from Sanity:', error);
    return [];
  }
}

/**
 * Fetch about document directly from Sanity CMS
 */
export async function getAbout(): Promise<AboutData | null> {
  if (!client) return null;
  try {
    const data = await client.fetch<AboutData>(aboutQuery);
    return data || null;
  } catch (error) {
    console.error('Failed to fetch about document from Sanity:', error);
    return null;
  }
}
