import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import TeacherItem from '../types/TeacherItem';
import sequelize from '../sequelize';
import Teacher from '../models/Teacher';

const teacherUpdate = {
  type: TeacherItem,
  args: {
    ID:{
      type: GraphQLInt,
    },
    code:{
      type: GraphQLString
    },
    firstName:{
      type: GraphQLString,
    },
    lastName:{
      type: GraphQLString,
    },
    departmentID:{
      type: GraphQLInt,
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Teacher.update({
        code : args.code,
        firstName : args.firstName,
        lastName : args.lastName,
        departmentID : args.departmentID,
      },
      {
        where : {
          ID : args.ID,
        }
      },
    ));
  },
};

export default teacherUpdate;
