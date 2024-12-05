import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidation from './student.validation';
import studentValidationSchema from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // Zod schema start
    const zodParsedData = studentValidationSchema.parse(studentData);
    // Zod schema end

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    /*   // joi validation
    const { error, value } = studentValidation.validate(studentData); */

    /*     // joi validate data sending to DB
    const result = await StudentServices.createStudentIntoDB(value); */

    // console.log(error, value);

    /* // joi error message
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Student validation failed!',
        error: error.details,
      });
    } */

    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    // response
    res.status(200).json({
      success: true,
      message: 'Students data retrived successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};
// get a single student // S002
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // response
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

// delete single student from db
const deleteAStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);
    // response
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteAStudent,
};
