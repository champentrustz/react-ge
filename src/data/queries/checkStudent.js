import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import sequelize from '../sequelize';
import CheckStudentItem from '../types/CourseCheckStudentItem';
import CheckStudent from '../models/CourseCheckStudent';
import Course from '../models/Course';
import Student from '../models/Student';

const checkStudent = {
  type: new List(CheckStudentItem),
  args : {
    courseID : {
      type : GraphQLString
    },
    section : {
      type : GraphQLString
    },
    checkinDate : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CheckStudent.findAll({

      where : {
        courseID : args.courseID,
        section : args.section,
        checkinDate : {
          $like: '%'+args.checkinDate+'%'
        }
      },
      order: [
        ['studentID', 'ASC'],
      ]

    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default checkStudent;
