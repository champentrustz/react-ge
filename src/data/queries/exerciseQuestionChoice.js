import {
  GraphQLList as List,
  GraphQLInt

} from 'graphql';
import ExerciseQuestionChoiceItem from '../types/ExerciseQuestionChoiceItem';
import sequelize from '../sequelize';
import ExerciseQuestionChoice from '../models/ExerciseQuestionChoice';
import ExerciseQuestion from '../models/ExerciseQuestion';

const exerciseQuestionChoice = {
  type: new List(ExerciseQuestionChoiceItem),
  args : {
    exercise_question_id : {
      type : GraphQLInt
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => ExerciseQuestionChoice.findAll({
      where : {
        exercise_question_id : args.exercise_question_id,
      },
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default exerciseQuestionChoice;
