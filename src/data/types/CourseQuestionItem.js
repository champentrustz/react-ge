import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLInt as Integer,
} from 'graphql';

import CourseItem from '../types/CourseItem';
import Course from '../models/Course';
import StudentItem from '../types/StudentItem';
import Student from '../models/Student';
import sequelize from '../sequelize';

const QuestionItem = new ObjectType({
  name: 'QuestionItem',
  fields: {
    ID : {type : Integer},
    courseID: {type : StringType},
    section: {type : StringType},
    studentID:  {type : StringType},
    question: {type: StringType},
    answer: {type: StringType},
    vote: {type: Integer},
    date: {type: StringType},
  },
});

export default QuestionItem;
