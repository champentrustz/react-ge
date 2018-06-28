import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import ExerciseItem from '../types/ExerciseItem';

import sequelize from '../sequelize';
import Exercise from '../models/Exercise';

const deleteExercise = {
  type: ExerciseItem,
  args: {
    id:{
      type: GraphQLInt,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Exercise.destroy({
        where :{
          id : args.id,
        }
      },
    ));
  },
};

export default deleteExercise;
