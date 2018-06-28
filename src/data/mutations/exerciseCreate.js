import {
  GraphQLList as List,
  GraphQLInt,
  GraphQLString,

} from 'graphql';
import ExerciseItem from '../types/ExerciseItem';
import sequelize from '../sequelize';
import Exercise from '../models/Exercise';

const exerciseCreate = {
  type: new List(ExerciseItem),
  args : {
    course_id : {
      type : GraphQLString
    },
    section : {
      type : GraphQLString
    },
    name :{
      type : GraphQLString
    },
    amount :{
      type : GraphQLInt
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Exercise.create({
      course_id : args.course_id,
      section : args.section,
      name : args.name,
      amount : args.amount,
      total_score : 0,
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default exerciseCreate;
