import Joi from 'joi';

// UserName Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .custom((value, helpers) => {
      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      if (formatted !== value) {
        return helpers.message(`${value} should be in capitalized format`);
      }
      return value;
    }),
  middleName: Joi.string().allow(null, '').optional(),
  lastName: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!/^[A-Za-z]+$/.test(value)) {
        return helpers.message(`${value} should contain only alphabets`);
      }
      return value;
    }),
});

// Gurdian Schema
const gurdianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': "Father's Name is required",
  }),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// LocalGurdian Schema
const localGurdianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// studentValidationSchema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({ 'any.only': '{#value} is not valid' }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'string.email': '{#value} is not a valid email' }),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  gurdian: gurdianValidationSchema.required(),
  localGurdian: localGurdianValidationSchema.required(),
  profileImg: Joi.string().uri().optional(),
  isActive: Joi.string().valid('active', 'inactive').default('active'),
});

export default studentValidationSchema;
