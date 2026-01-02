import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

export const useDefineSchemaTools = {
  UniversityPK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),
  FacultyPK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),
  InstitutePK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),
  CoursePK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),
  ProgramPK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),
  SpecializationPK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),
  DepartmentPK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),
  DesignationPK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),

  AcademicYearPK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),

  FinancialYearPK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),

  VerificationStatusPK: z
    .string()
    .trim()
    .transform(val => (val == '' ? null : val))
    .nullish(),

  nullableString: ({ maxLength }: { maxLength?: number } = {}) =>
    z
      .string()
      .trim()
      .max(maxLength!, { message: `Must be ${maxLength} or fewer characters long` })
      .transform(value => (value === '' ? null : value))
      .nullish(),

  nullableDropDown: () =>
    z
      .string()
      .trim()
      .transform(value => (value === '' ? null : value))
      .nullish(),
};

export const useDefineSchemaToolsRequired = {
  UniversityPK: z
    .string({ message: 'Select University' })
    .trim()
    .transform(value => (value === '' ? null : value))
    .refine(value => value !== null, {
      message: 'Select University',
    }),

  FacultyPK: z
    .string({ message: 'Select Faculty' })
    .trim()
    .transform(value => (value === '' ? null : value))
    .refine(value => value !== null, {
      message: 'Select Faculty',
    }),
  InstitutePK: z
    .string({ message: 'Select Institute' })
    .trim()
    .transform(value => (value === '' ? null : value))
    .refine(value => value !== null, {
      message: 'Select Institute',
    }),
  CoursePK: z
    .string({ message: 'Select Course' })
    .trim()
    .transform(value => (value === '' ? null : value))
    .refine(value => value !== null, {
      message: 'Select Course',
    }),
  ProgramPK: z
    .string({ message: 'Select Program' })
    .trim()
    .transform(value => (value === '' ? null : value))
    .refine(value => value !== null, {
      message: 'Select Program',
    }),
  SpecializationPK: z
    .string({ message: 'Select Specialization' })
    .trim()
    .transform(value => (value === '' ? null : value))
    .refine(value => value !== null, {
      message: 'Select Specialization',
    }),

  DepartmentPK: z
    .string({ message: 'Select Department' })
    .trim()
    .transform(value => (value === '' ? null : value))
    .refine(value => value !== null, {
      message: 'Select Department',
    }),

  AcademicYearPK: z
    .string({ message: 'Select Academic Year' })
    .trim()
    .transform(value => (value === '' ? null : value))
    .refine(value => value !== null, {
      message: 'Select Academic Year',
    }),

  requiredDropDown: ({ message }: { message: string }) =>
    z
      .string({ message })
      .trim()
      .transform(value => (value === '' ? null : value))
      .refine(value => value !== null, { message }),

  requiredString: ({
    message,
    minLength = 1,
    maxLength,
  }: {
    message: string;
    minLength?: number;
    maxLength?: number;
  }) =>
    z
      .string({ message })
      .trim()
      .min(minLength, { message: ` Must be ${minLength} or greater characters long ` })
      .max(maxLength!, { message: `Must be ${maxLength} or fewer characters long` })
      .transform(value => (value === '' ? null : value))
      .refine(value => value !== null, { message }),
  requiredDecimal: ({
    message,
    Precision,
    Scale,
    minValue,
    maxValue,
  }: {
    message: string;
    Precision: number;
    Scale: number;
    minValue?: number;
    maxValue?: number;
  }) =>
    z.coerce
      .number({
        error: message,
      })
      .refine(
        val => {
          const [intPart, fracPart = ''] = val.toString().split('.');
          return intPart.length <= Precision - Scale && fracPart.length <= Scale;
        },
        {
          message: `Must be a valid decimal(${Precision},${Scale})`,
        }
      )
      .refine(val => minValue === undefined || val >= minValue, {
        message: `Value must be greater than or equal to ${minValue}`,
      })
      .refine(val => maxValue === undefined || val <= maxValue, {
        message: `Value must be less than or equal to ${maxValue}`,
      }),
};

export const schemaTools = {
  nullableDateTimeSchema: z.preprocess(
    val => {
      if (val == null) return null; // accept null/undefined
      if (typeof val === 'string' || val instanceof Date) {
        return dayjs(val);
      }
      return val;
    },
    z.custom<Dayjs | null>(val => val === null || (dayjs.isDayjs(val) && val.isValid()), {
      message: 'Invalid datetime',
    })
  ),

  timeSchema: z.preprocess(
    val => {
      if (typeof val === 'string') return dayjs(val, 'HH:mm:ss', true);
      return val;
    },
    z.custom<Dayjs>(val => dayjs.isDayjs(val) && val.isValid(), {
      message: 'Invalid time',
    })
  ),

  nonNullableDayjs: z.preprocess(
    val => {
      if (typeof val === 'string' || val instanceof Date) return dayjs(val);
      return val;
    },
    z.custom<Dayjs>(val => dayjs.isDayjs(val) && val.isValid(), {
      message: 'Invalid datetime',
    })
  ),

  nullableDayjs: z.preprocess(
    val => {
      if (val == null) return null;
      if (typeof val === 'string' || val instanceof Date) return dayjs(val);
      return val;
    },
    z.custom<Dayjs | null>(val => val === null || (dayjs.isDayjs(val) && val.isValid()), {
      message: 'Invalid datetime',
    })
  ),
};
