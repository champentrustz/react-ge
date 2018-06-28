import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import StudentItem from '../types/StudentItem';
import sequelize from '../sequelize';
import Student from '../models/Student';

const studentUpdate = {
  type: StudentItem,
  args: {
    code:{
      type: GraphQLString
    },
    firstName:{
      type: GraphQLString,
    },
    lastName:{
      type: GraphQLString,
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Student.update({

        firstName : args.firstName,
        lastName : args.lastName,
      },
      {
        where : {
          code : args.code,
        }
      },
    ));
  },
};

export default studentUpdate;
