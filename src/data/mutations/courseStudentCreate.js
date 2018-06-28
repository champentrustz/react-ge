import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import CourseStudentItem from '../types/CourseStudentItem';

import sequelize from '../sequelize';
import CourseStudent from '../models/CourseStudent';

const courseStudentCreate = {
  type: new List(CourseStudentItem),
  args: {
    courseID:{
      type: GraphQLInt,
    },
    studentID:{
      type: GraphQLInt,
    },
    semester:{
      type: GraphQLInt,
    },
    year:{
      type: GraphQLInt,
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CourseStudent.create({
      courseID : args.courseID,
      studentID : args.studentID,
      semester : args.semester,
      year : args.year,
    }));
  },
};

export default courseStudentCreate;
