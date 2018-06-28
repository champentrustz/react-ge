import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import TeacherAssistantItem from '../types/TeacherAssistantItem';

import sequelize from '../sequelize';
import TeacherAssistant from '../models/TeacherAssistant';

const teacherAssistantCreate = {
  type: TeacherAssistantItem,
  args: {
    code:{
      type: GraphQLString,
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
    return sequelize.sync().then(() => TeacherAssistant.create({
        code : args.code,
        firstName : args.firstName,
        lastName : args.lastName,
        departmentID : args.departmentID,
      },
    ));
  },
};

export default teacherAssistantCreate;
