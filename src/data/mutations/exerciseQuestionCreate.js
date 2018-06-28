import {
  GraphQLList as List,
  GraphQLInt,
  GraphQLString,

} from 'graphql';
import ExerciseQuestionItem from '../types/ExerciseQuestionItem';
import sequelize from '../sequelize';
import ExerciseQuestion from '../models/ExerciseQuestion';

const exerciseQuestionCreate = {
  type: ExerciseQuestionItem,
  args : {
    exercise_id : {
      type : GraphQLInt
    },
    question :{
      type : GraphQLString
    },
    score :{
      type : GraphQLInt
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => ExerciseQuestion.create({
      exercise_id : args.exercise_id,
      question : args.question,
      score : args.score,
    }));
  },
};

export default exerciseQuestionCreate;
