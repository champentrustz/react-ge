import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import TeacherAssistantItem from '../types/TeacherAssistantItem';
import sequelize from '../sequelize';
import TeacherAssistant from '../models/TeacherAssistant';

const teacherAssistantUpdate = {
  type: TeacherAssistantItem,
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
    return sequelize.sync().then(() => TeacherAssistant.update({
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

export default teacherAssistantUpdate;
