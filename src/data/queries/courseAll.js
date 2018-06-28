import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import CourseItem from '../types/CourseItem';

import sequelize from '../sequelize';
import Course from '../models/Course';

const courseAll = {
  type: new List(CourseItem),

  resolve(){
    return sequelize.sync().then(() => Course.findAll({
      where: {
        deleteAt : null
      }
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default courseAll;
