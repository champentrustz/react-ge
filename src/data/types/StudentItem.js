import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as Integer,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

import ExerciseStudentScoreItem from '../types/ExerciseStudentScoreItem';
import ExerciseStudentScore from '../models/ExerciseStudentScore';
import sequelize from '../sequelize';


const StudentItem = new ObjectType({
  name: 'StudentItem',
  fields: {
    ID: {type: Integer},
    code: {type: StringType},
    firstName: {type: StringType},
    lastName: {type: StringType},
    deleteAt: {type: StringType},
    exercise_score : {type : new List(ExerciseStudentScoreItem), resolve(parent){
      return sequelize.sync().then(() => ExerciseStudentScore.findAll({
        where : {
          student_id : parent.ID,
        },
        order: [
          [ 'exercise_id', 'ASC'],
        ]
      }))
    },},
  },
});

export default StudentItem;
