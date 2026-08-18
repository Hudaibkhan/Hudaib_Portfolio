import { groq } from 'next-sanity';

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    coverImage,
    techStack,
    liveUrl,
    githubUrl,
    featured,
    order,
    publishedAt,
    content
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    coverImage,
    techStack,
    liveUrl,
    githubUrl,
    featured,
    order,
    publishedAt
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    coverImage,
    techStack,
    liveUrl,
    githubUrl,
    featured,
    order,
    publishedAt,
    content
  }
`;

export const skillsQuery = groq`
  *[_type == "skill"] | order(order asc, name asc) {
    _id,
    name,
    category,
    level,
    order
  }
`;

export const aboutQuery = groq`
  *[_type == "about"][0] {
    _id,
    role,
    pitch,
    bio,
    location,
    profileImage,
    "resumeUrl": resumeFile.asset->url,
    focusAreas
  }
`;
