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

const question = {
  type: new List(QuestionItem),
  args : {
    courseID : {
      type : GraphQLString
    },
    section : {
      type : GraphQLString
    },
    date : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Question.findAll({
      where : {
        courseID : args.courseID,
        section : args.section,
        date : args.date,
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

export default question;
