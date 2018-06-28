/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import Faculty from './Faculty';
import Department from './Department';
import Course from './Course';
import Question from './CourseQuestion';
import CourseMakeup from './CourseMakeup';
import Teacher from './Teacher';
import Student from './Student';
import CheckStudent from './CourseCheckStudent';
import TeacherCourse from './CourseTeacher';
import StudentRegistration from "./CourseStudent";
import CourseTeacherAssistant from './CouseTeacherAssistant';
import TeacherAssistant from './TeacherAssistant';
import Exercise from './Exercise';
import ExerciseQuestion from "./ExerciseQuestion";
import ExerciseQuestionChoice from './ExerciseQuestionChoice';
import ExerciseStudentScore from './ExerciseStudentScore';
import Survey from './Survey';
import SurveyCourse from './SurveyCourse';
import SurveyQuestion from './SurveyQuestion';
import SurveyRemark from './SurveyRemark';
import SurveyScore from './SurveyScore';

Faculty.hasMany(Department, {
  foreignKey: 'facultyID',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Department.belongsTo(Faculty, {
  foreignKey: 'facultyID',
});



Department.hasMany(Teacher, {
  foreignKey: 'departmentID',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Teacher.belongsTo(Department, {
  foreignKey: 'departmentID',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Department.hasMany(TeacherAssistant, {
  foreignKey: 'departmentID',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

TeacherAssistant.belongsTo(Department, {
  foreignKey: 'departmentID',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});






Student.hasMany(StudentRegistration, {
  foreignKey: 'studentID',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

StudentRegistration.belongsTo(Student, {
  foreignKey: 'studentID',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Exercise.hasMany(ExerciseStudentScore, {
  foreignKey: 'exercise_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ExerciseStudentScore.belongsTo(Exercise, {
  foreignKey: 'exercise_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});




Exercise.hasMany(ExerciseQuestion, {
  foreignKey: 'exercise_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ExerciseQuestion.belongsTo(Exercise, {
  foreignKey: 'exercise_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ExerciseQuestion.hasMany(ExerciseQuestionChoice, {
  foreignKey: 'exercise_question_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ExerciseQuestionChoice.belongsTo(ExerciseQuestion, {
  foreignKey: 'exercise_question_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});



// User.hasMany(UserClaim, {
//   foreignKey: 'userId',
//   as: 'claims',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
//
//
// User.hasOne(UserProfile, {
//   foreignKey: 'userId',
//   as: 'profile',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
//
// User.hasMany(UserLogin, {
//   foreignKey: 'userId',
//   as: 'logins',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });




function sync(...args) {
  return sequelize.sync(...args);
}

export default {sync};
export {User, UserLogin, UserClaim, UserProfile, Course, Question, StudentRegistration,
  Teacher, TeacherCourse, CheckStudent, Student, Faculty, Department, CourseMakeup,
 CourseTeacherAssistant, TeacherAssistant, Exercise, ExerciseQuestion, ExerciseQuestionChoice ,ExerciseStudentScore,
  Survey, SurveyCourse, SurveyQuestion, SurveyRemark, SurveyScore};
