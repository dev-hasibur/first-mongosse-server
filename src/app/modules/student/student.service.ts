import { Aggregate } from 'mongoose';
import { Student } from '../student.model';
import { TStudent } from './studentInterface';

// creating a student in DB
const createStudentIntoDB = async (studentData: TStudent) => {
  // -------------------------Built-in-static-method-start---------------------------
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  // built in static method --> StudentModel.create()
  const result = await Student.create(studentData);
  return result;
  // -------------------------Built-in-static-method-end---------------------------

  // -------------------------Built-in-instance-method-start-----------------------
  /* 
  // built in instance method -->
  const student = new Student(studentData);
  // checking if user already exists start
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  // checking if user already exists end
  const result = await student.save();
  return result;
   // -------------------------Built-in-instance-method-end--------------------------
   */
};

// get all students from DB
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
// get single student from DB
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
// Delete single student from DB
const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
