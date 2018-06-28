import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import StudentItem from '../types/StudentItem';

import sequelize from '../sequelize';
import Student from '../models/Student';

const d = new Date();
const mm = ("0" + (d.getMonth() + 1)).slice(-2);
const dd = ("0" + (d.getDate())).slice(-2);
const yyyy = d.getFullYear();
const today = yyyy + '-' + mm + '-' + dd ; //(US)
const timeToday =  new Date().toLocaleTimeString('en-US',{ hour12: false });
const dateTime = today+' '+timeToday;

const deleteStudent = {
    type: StudentItem,
    args: {
    ID:{
      type: GraphQLInt,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Student.update({
      deleteAt : dateTime,
      },
      {
        where :{
          ID : args.ID,
        }
      }
    ));
  },
};

export default deleteStudent;
