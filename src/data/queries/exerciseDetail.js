import {
  GraphQLList as List,
  GraphQLInt

} from 'graphql';
import ExerciseItem from '../types/ExerciseItem';
import sequelize from '../sequelize';
import Exercise from '../models/Exercise';

const exerciseDetail = {
  type: new List(ExerciseItem),
  args : {
    id : {
      type : GraphQLInt
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Exercise.findAll({
      where : {
        id : args.id,
      },
      order: [
        ['id', 'ASC'],
    ],
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default exerciseDetail;
