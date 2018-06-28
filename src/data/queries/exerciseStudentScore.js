import {
  GraphQLList as List,
  GraphQLInt,
  GraphQLString

} from 'graphql';
import ExerciseItem from '../types/ExerciseItem';
import sequelize from '../sequelize';
import Exercise from '../models/Exercise';
import ExerciseStudentScore from '../models/ExerciseStudentScore';

const exerciseStudentScore = {
  type: new List(ExerciseItem),
  args : {
    course_id : {
      type : GraphQLString
    },
    section : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Exercise.findAll({
      include: [
        { model: ExerciseStudentScore,}
      ],
      where : {
        course_id : args.course_id,
        section : args.section,
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

export default exerciseStudentScore;
