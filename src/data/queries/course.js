import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';
import CourseItem from '../types/CourseItem';

import sequelize from '../sequelize';
import Course from '../models/Course';

const course = {
  type: new List(CourseItem),
  args : {
    code : {
      type : GraphQLString
    },
    section : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Course.findAll({
      where :{
        code : args.code,
        section : args.section,
      }
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default course;
