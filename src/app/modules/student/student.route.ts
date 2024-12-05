import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// will call controller function
// create a student
router.post('/create-student', StudentControllers.createStudent);
//get all students
router.get('/', StudentControllers.getAllStudents);
//get single student
router.get('/:studentId', StudentControllers.getSingleStudent);
//delete single student
router.delete('/:studentId', StudentControllers.deleteAStudent);

export const StudentRoutes = router;
