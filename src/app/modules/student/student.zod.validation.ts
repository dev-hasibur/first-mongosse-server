import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name cannot exceed 20 characters' })
    .refine(
      (value) => {
        const formatted =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return formatted === value;
      },
      { message: 'First name should be in capitalized format' },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last name should contain only alphabets',
  }),
});

// Gurdian Schema
const gurdianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father's Name is required" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's Occupation is required" }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father's Contact No is required" }),
  motherName: z.string().nonempty({ message: "Mother's Name is required" }),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's Occupation is required" }),
  motherContactNo: z
    .string()
    .nonempty({ message: "Mother's Contact No is required" }),
});

// LocalGurdian Schema
const localGurdianValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Local guardian name is required' }),
  occupation: z
    .string()
    .nonempty({ message: 'Local guardian occupation is required' }),
  contactNo: z
    .string()
    .nonempty({ message: 'Local guardian contact no is required' }),
  address: z
    .string()
    .nonempty({ message: 'Local guardian address is required' }),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().nonempty({ message: 'ID is required' }),
  password: z
    .string()
    .nonempty({ message: 'password is required' })
    .max(20, 'password cannot be more than 20 character.'),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Gender must be male, female, or other' }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .nonempty({ message: 'Email is required' }),
  contactNo: z.string().nonempty({ message: 'Contact number is required' }),
  emergencyContactNo: z
    .string()
    .nonempty({ message: 'Emergency contact number is required' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z
    .string()
    .nonempty({ message: 'Present address is required' }),
  permanentAddress: z
    .string()
    .nonempty({ message: 'Permanent address is required' }),
  gurdian: gurdianValidationSchema,
  localGurdian: localGurdianValidationSchema,
  profileImg: z.string().url().optional(),
  isActive: z.enum(['active', 'inactive']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
