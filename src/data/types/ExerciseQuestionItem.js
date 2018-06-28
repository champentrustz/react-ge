import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as Integer,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as Float,
} from 'graphql';

import ExerciseItem from '../types/ExerciseItem';
import Exercise from '../models/Exercise';
import ExerciseQuestionChoiceItem from '../types/ExerciseQuestionChoiceItem';
import ExerciseQuestionChoice from '../models/ExerciseQuestionChoice';
import sequelize from '../sequelize';

const ExerciseQuestionItem = new ObjectType({
  name: 'ExerciseQuestionItem',
  fields: {
    id: {type: Integer},
    exercise_id: {type: Integer},
    question: {type: StringType},
    score: {type: Float},
    exercise_question_choice_id : {type : new List(ExerciseQuestionChoiceItem), resolve(parent){
      return sequelize.sync().then(() => ExerciseQuestionChoice.findAll({
        where : {
          exercise_question_id : parent.id,
        },
      }))
    },},
  },
});



export default ExerciseQuestionItem;
