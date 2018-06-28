import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import CheckStudentItem from '../types/CourseCheckStudentItem';
import sequelize from '../sequelize';
import CheckStudent from '../models/CourseCheckStudent';

const checkStudentAbsent = {
  type: CheckStudentItem,
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
    firstName:{
      type: GraphQLString,
    },
    lastName:{
      type: GraphQLString,
    },
    status:{
      type: GraphQLString,
    },
    checkinDate:{
      type: GraphQLString,
    },
    checkoutDate:{
      type: GraphQLString,
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CheckStudent.create({
        checkoutDate : args.checkoutDate,
        checkinDate : args.checkinDate,
        status : args.status,
        courseID : args.courseID,
        section : args.section,
        studentID : args.studentID,
        firstName : args.firstName,
        lastName : args.lastName,
      },
    ));
  },
};

export default checkStudentAbsent;
