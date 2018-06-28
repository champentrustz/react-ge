import {
  GraphQLList as List,
  GraphQLInt

} from 'graphql';
import ExerciseQuestionItem from '../types/ExerciseQuestionItem';
import sequelize from '../sequelize';
import ExerciseQuestion from '../models/ExerciseQuestion';
import ExerciseQuestionChoice from '../models/ExerciseQuestionChoice';

const exerciseQuestionDetail = {
  type: new List(ExerciseQuestionItem),
  args : {
    exercise_id : {
      type : GraphQLInt
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => ExerciseQuestion.findAll({
      include: [
        { model: ExerciseQuestionChoice,}
      ],
      where : {
        exercise_id : args.exercise_id,
      },
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default exerciseQuestionDetail;
