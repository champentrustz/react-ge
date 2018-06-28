import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';
import QuestionItem from '../types/CourseQuestionItem';

import sequelize from '../sequelize';
import Question from '../models/CourseQuestion';
import Course from '../models/Course';
import Student from '../models/Student';

const questionOtherStudent = {
  type: new List(QuestionItem),
  args : {
    courseID : {
      type : GraphQLString
    },
    date : {
      type : GraphQLString
    },
    studentID : {
      type : GraphQLString
    },
    section : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Question.findAll({
      where : {
        courseID : args.courseID,
        date : args.date,
        section : args.section,
        studentID: {
          $ne: args.studentID
        }
      },
      order: [
        [ 'vote', 'DESC'],
      ]
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default questionOtherStudent;
