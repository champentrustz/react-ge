import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import TeacherItem from '../types/TeacherItem';
import sequelize from '../sequelize';
import Teacher from '../models/Teacher';

const teacherCreate = {
  type: TeacherItem,
  args: {
    code:{
      type: GraphQLString,
    },
    position:{
      type: GraphQLString,
    },
    firstName:{
      type: GraphQLString,
    },
    lastName:{
      type: GraphQLString,
    },
    username:{
      type: GraphQLString,
    },
    password:{
      type: GraphQLString,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Teacher.create({
        code : args.code,
        firstName : args.firstName,
        lastName : args.lastName,
        position : args.position,
        username : args.username,
        password : args.password,

      },
    ));
  },
};

export default teacherCreate;
