import {
  GraphQLList as List,
  GraphQLInt,
  GraphQLString,

} from 'graphql';
import ExerciseQuestionChoiceItem from '../types/ExerciseQuestionChoiceItem';
import sequelize from '../sequelize';
import ExerciseQuestionChoice from '../models/ExerciseQuestionChoice';

const exerciseQuestionChoiceCCreate = {
  type: ExerciseQuestionChoiceItem,
  args : {
    exercise_question_id : {
      type : GraphQLInt
    },
    choice :{
      type : GraphQLString
    },
    status :{
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => ExerciseQuestionChoice.create({
      exercise_question_id : args.exercise_question_id,
      choice : args.choice,
      status : args.status,
    }));
  },
};

export default exerciseQuestionChoiceCCreate;
