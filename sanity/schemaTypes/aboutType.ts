import { defineField, defineType } from 'sanity';

export const aboutType = defineType({
  name: 'about',
  title: 'About (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Headline Role',
      type: 'string',
      initialValue: 'AI Engineer & Full-Stack Developer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pitch',
      title: 'One-Line Pitch',
      type: 'text',
      rows: 2,
      initialValue:
        'Building AI agents, automation systems, and modern web apps — learning by shipping real projects, not just tutorials.',
    }),
    defineField({
      name: 'bio',
      title: 'Full Bio',
      type: 'array',
      of: [{ type: 'block' }],
      
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Karachi, Pakistan',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume File (PDF/DOC)',
      type: 'file',
    }),
    defineField({
      name: 'focusAreas',
      title: 'Current Focus Areas',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'location',
    },
  },
});
