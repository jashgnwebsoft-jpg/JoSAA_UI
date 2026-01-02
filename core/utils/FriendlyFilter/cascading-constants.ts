import type { CascadingFieldConfig } from './useCascadingFields';
import type { FieldValues } from 'react-hook-form';

/**
 * Common cascading field configurations for educational/institutional management.
 * These configurations define the hierarchical relationships between form fields
 * where changing a parent field should reset its dependent children.
 */

/**
 * Standard university hierarchy: University -> Faculty -> Course
 * Used across most educational modules for consistent cascading behavior
 */
export const UNIVERSITY_HIERARCHY_CASCADE = [
  { parent: 'UniversityPK' as const, children: ['FacultyPK', 'CoursePK'] as const },
  { parent: 'FacultyPK' as const, children: ['CoursePK'] as const },
];

/**
 * Full educational institution cascade including specializations and departments
 * Extends the basic university hierarchy with additional institutional entities
 */
export const FULL_INSTITUTIONAL_CASCADE = [
  {
    parent: 'UniversityPK' as const,
    children: ['FacultyPK', 'CoursePK', 'InstitutePK', 'DepartmentPK'] as const,
  },
  { parent: 'FacultyPK' as const, children: ['CoursePK', 'SpecializationPK'] as const },
  { parent: 'CoursePK' as const, children: ['SpecializationPK'] as const },
  { parent: 'InstitutePK' as const, children: ['DepartmentPK'] as const },
];

/**
 * Program-specific cascade configuration
 * Used in program management modules
 */
export const PROGRAM_CASCADE_CONFIG = [
  { parent: 'UniversityPK' as const, children: ['FacultyPK', 'CoursePK', 'InstitutePK'] as const },
  { parent: 'FacultyPK' as const, children: ['CoursePK'] as const },
  { parent: 'InstitutePK' as const, children: ['DepartmentPK'] as const },
  { parent: 'CoursePK' as const, children: ['SpecializationPK'] as const },
];

/**
 * Type helper to ensure cascade configs match expected filter model structure
 */
export type CascadeConfigFor<T extends FieldValues> = CascadingFieldConfig<T>[];

/**
 * Utility function to create typed cascade config for specific filter models
 */
export const createCascadeConfig = <T extends FieldValues>(
  config: CascadingFieldConfig<T>[]
): CascadingFieldConfig<T>[] => config;
