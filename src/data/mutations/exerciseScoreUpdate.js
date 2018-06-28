import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import ExerciseItem from '../types/ExerciseItem';
import sequelize from '../sequelize';
import Exercise from '../models/Exercise';

const exerciseScoreUpdate = {
  type: ExerciseItem,
  args: {
    id:{
      type: GraphQLInt,
    },
    score:{
      type: GraphQLInt
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Exercise.update({
        total_score : args.score,
      },
      {
        where : {
          id : args.id,
        }
      },
    ));
  },
};

export default exerciseScoreUpdate;
