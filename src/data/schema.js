/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import news from './queries/news';
import me from './queries/me';
import course from './queries/course';
import question from './queries/question';
import department from './queries/department';
import faculty from './queries/faculty';
import studentDetail from './queries/studentDetail';
import teacherDetail from './queries/teacherDetail';
import teacherCourse from './queries/teacherCourse';
import studentCourse from './queries/studentCourse';
import checkStudent from './queries/checkStudent';
import checkStatus from './queries/checkStatus';
import courseMakeup from './queries/courseMakeup';
import courseTeacherAssistant from './queries/courseTeacherAssistant';
import courseExercise from './queries/courseExercise';
import exerciseQuestionLatest from './queries/exerciseQuestionLatest';
import exerciseDetail from './queries/exerciseDetail';
import exerciseLatest from './queries/exerciseLatest';
import studentDetailAll from './queries/studentDetailAll';
import studentLatest from './queries/studentLatest';
import courseAll from './queries/courseAll';
import teacherAll from './queries/teacherAll';
import teacherAssistantAll from './queries/teacherAssistantAll';
import teacherAssistantDetail from './queries/teacherAssistantDetail';
import exerciseQuestionDetail from './queries/exerciseQuestionDetail';
import exerciseQuestionChoice from './queries/exerciseQuestionChoice';
import courseStudent from './queries/courseStudent';
import exerciseStudentScore from './queries/exerciseStudentScore';
import questionStudent from './queries/questionStudent';
import questionOtherStudent from './queries/questionOtherStudent';
import adminAll from './queries/adminAll';
import individualStudentScore from './queries/individualStudentScore';
import adminDetail from './queries/adminDetail';

import courseCreate from './mutations/courseCreate';
import questionCreate from './mutations/questionCreate';
import checkinStudentCreate from './mutations/checkinStudentCreate';
import codeCheckoutUpdate from './mutations/codeCheckoutUpdate';
import codeCheckinUpdate from './mutations/codeCheckinUpdate';
import voteQuestion from './mutations/voteQuestion';
import checkoutStudent from './mutations/checkoutStudent';
import answerCreate from './mutations/answerCreate';
import exerciseCreate from './mutations/exerciseCreate';
import exerciseQuestionCreate from './mutations/exerciseQuestionCreate';
import exerciseQuestionChoiceACreate from './mutations/exerciseQuestionChoiceACreate';
import exerciseQuestionChoiceBCreate from './mutations/exerciseQuestionChoiceBCreate';
import exerciseQuestionChoiceCCreate from './mutations/exerciseQuestionChoiceCCreate';
import exerciseQuestionChoiceDCreate from './mutations/exerciseQuestionChoiceDCreate';
import studentCheckinEdit from './mutations/studentCheckinEdit';
import studentCreate from './mutations/studentCreate';
import courseStudentCreate from './mutations/courseStudentCreate';
import teacherCreate from './mutations/teacherCreate';
import teacherAssistantCreate from './mutations/teacherAssistantCreate';
import deleteStudent from './mutations/deleteStudent';
import deleteTeacher from './mutations/deleteTeacher';
import deleteTeacherAssistant from './mutations/deleteTeacherAssistant';
import studentUpdate from './mutations/studentUpdate';
import teacherUpdate from './mutations/teacherUpdate';
import teacherAssistantUpdate from './mutations/teacherAssistantUpdate';
import exerciseScoreUpdate from './mutations/exerciseScoreUpdate';
import checkStudentAbsent from './mutations/checkStudentAbsent';
import cancelClass from './mutations/cancelClass';
import makeUpClass from './mutations/makeUpClass';
import deleteCourseMakeUpCancel from './mutations/deleteCourseMakeUpCancel';
import deleteExercise from './mutations/deleteExercise';
import deleteCourse from './mutations/deleteCourse';
import courseUpdate from './mutations/courseUpdate';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      news,
      me,
      course,
      question,
      studentCourse,
      department,
      faculty,
      teacherCourse,
      studentDetail,
      teacherDetail,
      checkStudent,
      checkStatus,
      courseMakeup,
      courseTeacherAssistant,
      courseExercise,
      exerciseQuestionLatest,
      exerciseDetail,
      exerciseLatest,
      studentDetailAll,
      studentLatest,
      courseAll,
      teacherAll,
      teacherAssistantAll,
      teacherAssistantDetail,
      exerciseQuestionDetail,
      exerciseQuestionChoice,
      courseStudent,
      exerciseStudentScore,
      questionStudent,
      questionOtherStudent,
      adminAll,
      individualStudentScore,
      adminDetail,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      courseCreate,
      questionCreate,
      checkinStudentCreate,
      codeCheckoutUpdate,
      codeCheckinUpdate,
      voteQuestion,
      checkoutStudent,
      answerCreate,
      exerciseCreate,
      exerciseQuestionCreate,
      exerciseQuestionChoiceACreate,
      exerciseQuestionChoiceBCreate,
      exerciseQuestionChoiceCCreate,
      exerciseQuestionChoiceDCreate,
      studentCheckinEdit,
      studentCreate,
      courseStudentCreate,
      teacherCreate,
      teacherAssistantCreate,
      deleteStudent,
      deleteTeacher,
      deleteTeacherAssistant,
      studentUpdate,
      teacherUpdate,
      teacherAssistantUpdate,
      exerciseScoreUpdate,
      checkStudentAbsent,
      cancelClass,
      makeUpClass,
      deleteCourseMakeUpCancel,
      deleteExercise,
      deleteCourse,
      courseUpdate
    },
  }),
});

export default schema;
