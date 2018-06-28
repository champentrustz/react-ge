import {
  GraphQLList as List,
  GraphQLInt

} from 'graphql';
import ExerciseQuestionItem from '../types/ExerciseQuestionItem';
import sequelize from '../sequelize';
import ExerciseQuestion from '../models/ExerciseQuestion';

const exerciseQuestionLatest = {
  type: new List(ExerciseQuestionItem),
  args : {
    exercise_id : {
      type : GraphQLInt
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => ExerciseQuestion.findAll({
      limit : 1,
      where : {
        exercise_id : args.exercise_id,
      },
      order: [ [ 'id', 'DESC' ]]
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default exerciseQuestionLatest;
