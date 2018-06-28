import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as Integer,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ExerciseQuestionItem from '../types/ExerciseQuestionItem';
import ExerciseQuestion from '../models/ExerciseQuestion';
import sequelize from '../sequelize';

const ExerciseQuestionChoiceItem = new ObjectType({
  name: 'ExerciseQuestionChoiceItem',
  fields: {
    id: {type: Integer},
    exercise_question_id: {type: Integer},
    choice: {type: StringType},
    status: {type: StringType},
  },
});



export default ExerciseQuestionChoiceItem;
