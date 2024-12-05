import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  gurdian: TGurdian;
  localGurdian: TLocalGurdian;
  profileImg?: string;
  isActive: 'active' | 'inactive';
  isDeleted: boolean;
};

// -------------------for-->--Static-method--------------start-----------
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
// -------------------for-->--Static-method--------------end-----------

/* export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
}; 

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
*/
