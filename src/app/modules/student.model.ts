import { Schema, model } from 'mongoose';
import {
  TGurdian,
  TLocalGurdian,
  TStudent,
  StudentModel,
  TUserName,
} from './student/studentInterface';
import bcrypt from 'bcrypt';
import config from '../config';
// import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    maxLength: 20,
    /*  // custom validator function
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message: '{VALUE} shuld be capitalized format',
    }, */
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: true,
    /* validate: {
      validator: (value: string) => validator.isAlpha(value),
    },
    message: '{VALUE} shuld be only string format', */
  },
});

const gurdianSchema = new Schema<TGurdian>({
  fatherName: { type: String, required: [true, "Father's Name is required"] },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    maxlength: [20, 'password cannot be more than 20 character.'],
  },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    /* validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    }, */
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  gurdian: { type: gurdianSchema, required: true },
  localGurdian: { type: localGurdianSchema, required: true },
  profileImg: { type: String },
  isActive: { type: String, default: 'active' },
  isDeleted: { type: Boolean, default: false },
});

// pre save middleware / mongosse hooks start
studentSchema.pre('save', async function (next) {
  const user = this;
  // do stuff
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// pre save middleware / mongosse hooks end

// post save middleware / mongosse hooks start
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
// post save middleware / mongosse hooks end

// query middleware start
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  // [ { '$match': { isDeleted: {$ne: true} } } ]
  next();
});
// query middleware end

// creating userSchema by using Static Method start
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
// creating userSchema by using Static Method end

/* 
// creating user schema using instance
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
}; 
*/
// 3. Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
