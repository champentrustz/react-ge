import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as Integer,
  GraphQLFloat as Float,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';



const ExerciseStudentScoreItem = new ObjectType({
  name: 'ExerciseStudentScoreItem',
  fields: {
    id: {type: Integer},
    exercise_id: {type: Integer},
    student_id : {type: StringType},
    total_score: {type: Float},
  },
});



export default ExerciseStudentScoreItem;
