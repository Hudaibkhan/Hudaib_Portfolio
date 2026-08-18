import { type SchemaTypeDefinition } from 'sanity';
import { projectType } from './projectType';
import { skillType } from './skillType';
import { aboutType } from './aboutType';

export const schemaTypes: SchemaTypeDefinition[] = [
  projectType,
  skillType,
  aboutType,
];
