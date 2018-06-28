import {
  GraphQLList as List,
  GraphQLInt,
  GraphQLString

} from 'graphql';
import ExerciseStudentScoreItem from '../types/ExerciseStudentScoreItem';
import sequelize from '../sequelize';
import Student from '../models/Student';
import ExerciseStudentScore from '../models/ExerciseStudentScore';

const individualStudentScore = {
  type: new List(ExerciseStudentScoreItem),
  args : {
    student_id : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => ExerciseStudentScore.findAll({
      where : {
        student_id : args.student_id,
      },
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default individualStudentScore;
