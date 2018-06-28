import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import CheckStudentItem from '../types/CourseCheckStudentItem';
import sequelize from '../sequelize';
import CheckStudent from '../models/CourseCheckStudent';

const checkoutStudent = {
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
    checkoutDate:{
      type: GraphQLString,
    },
    checkinDate:{
      type: GraphQLString,
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CheckStudent.update({
      checkoutDate : args.checkoutDate,
    },
      {
        where : {
          courseID : args.courseID,
          section : args.section,
          studentID : args.studentID,
          checkinDate : {
            $like: '%'+args.checkinDate+'%'
          }
        }
      },
    ));
  },
};

export default checkoutStudent;
