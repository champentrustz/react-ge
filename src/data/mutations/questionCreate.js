import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import QuestionItem from '../types/CourseQuestionItem';

import sequelize from '../sequelize';
import Question from '../models/CourseQuestion';

const questionCreate = {
  type: QuestionItem,
  args: {
    courseID:{
      type: GraphQLString,
    },
    section:{
      type: GraphQLString,
    },
    studentID:{
      type: GraphQLString,
    },
    question:{
      type: GraphQLString,
    },
    date:{
      type: GraphQLString,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Question.create({
      courseID : args.courseID,
      section : args.section,
      studentID : args.studentID,
      question : args.question,
      date : args.date,
      vote : 0,
    }));
  },
};

export default questionCreate;
