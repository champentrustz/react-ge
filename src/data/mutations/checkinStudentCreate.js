import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import CheckStudentItem from '../types/CourseCheckStudentItem';
import sequelize from '../sequelize';
import CheckStudent from '../models/CourseCheckStudent';

const checkinStudentCreate = {
  type: CheckStudentItem,
  args: {
    courseID:{
      type: GraphQLString,
    },
    section:{
      type: GraphQLString,
    },
    firstName:{
      type: GraphQLString,
    },
    lastName:{
      type: GraphQLString,
    },
    studentID:{
      type: GraphQLString,
    },
    status:{
      type: GraphQLString,
    },
    checkinDate:{
      type: GraphQLString,
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CheckStudent.create({
      courseID : args.courseID,
      section : args.section,
      firstName : args.firstName,
      lastName : args.lastName,
      studentID : args.studentID,
      status : args.status,
      checkinDate : args.checkinDate,
    }));
  },
};

export default checkinStudentCreate;
