import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import CourseCheckStudentItem from '../types/CourseCheckStudentItem';

import sequelize from '../sequelize';
import CourseCheckStudent from '../models/CourseCheckStudent';

const studentCheckinEdit = {
  type: CourseCheckStudentItem,
  args: {
    ID:{
      type: GraphQLInt,
    },
    note:{
      type: GraphQLString,
    },
    status:{
      type: GraphQLString,
    },
    teacherID:{
      type: GraphQLString,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CourseCheckStudent.update({
        note : args.note,
        status : args.status,
        teacherID : args.teacherID,
      },
      {
        where : {
          ID : args.ID,
        }
      }
    ));
  },
};

export default studentCheckinEdit;
