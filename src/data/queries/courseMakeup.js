import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import CourseMakeupItem from '../types/CourseMakeupItem';

import sequelize from '../sequelize';
import CourseMakeup from '../models/CourseMakeup';

const courseMakeup = {
  type: new List(CourseMakeupItem),
  args : {
    course_id : {
      type : GraphQLString
    },
    operation_date : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CourseMakeup.findAll({
      where :{
        course_id : args.course_id,
        operation_date : args.operation_date,
        status : "MAKEUP"
      }
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default courseMakeup;
