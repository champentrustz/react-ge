import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as Integer,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLFloat as Float,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ExerciseStudentScoreItem from '../types/ExerciseStudentScoreItem';
import ExerciseStudentScore from '../models/ExerciseStudentScore';
import ExerciseQuestionItem from '../types/ExerciseQuestionItem';
import ExerciseQuestion from '../models/ExerciseQuestion';
import sequelize from '../sequelize';

const ExerciseItem = new ObjectType({
  name: 'ExerciseItem',
  fields: {
    id: {type: Integer},
    course_id: {type : StringType },
    section: {type : StringType },
    name: {type: StringType},
    amount: {type: Integer},
    total_score: {type: Float},
    exercise_question : {type : new List(ExerciseQuestionItem), resolve(parent){
      return sequelize.sync().then(() => ExerciseQuestion.findAll({
        where : {
          exercise_id : parent.id,
        },
      }))
    },},
    exercise_student_score : {type : new List(ExerciseStudentScoreItem), resolve(parent){
      return sequelize.sync().then(() => ExerciseStudentScore.findAll({
        where : {
          exercise_id : parent.id,
        },
      }))
    },},

  },
});



export default ExerciseItem;
