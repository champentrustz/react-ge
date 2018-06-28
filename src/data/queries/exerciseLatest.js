import {
  GraphQLList as List,
  GraphQLInt

} from 'graphql';
import ExerciseItem from '../types/ExerciseItem';
import sequelize from '../sequelize';
import Exercise from '../models/Exercise';

const exerciseLatest = {
  type: new List(ExerciseItem),
  args : {
    course_id : {
      type : GraphQLInt
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Exercise.findAll({
      limit : 1,
      where : {
        course_id : args.course_id,
      },
      order: [ [ 'createdAt', 'DESC' ]]
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default exerciseLatest;
