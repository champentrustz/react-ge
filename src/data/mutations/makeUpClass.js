import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import CourseMakeupItem from '../types/CourseMakeupItem';

import sequelize from '../sequelize';
import CourseMakeup from '../models/CourseMakeup';

const makeUpClass = {
  type: CourseMakeupItem,
  args: {
    course_id:{
      type: GraphQLInt,
    },
    operation_date:{
      type: GraphQLString,
    },
    operation_start:{
      type: GraphQLString,
    },
    operation_time_amount:{
      type: GraphQLInt,
    },
    status:{
      type: GraphQLString,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CourseMakeup.create({
        operation_date : args.operation_date,
        operation_start : args.operation_start,
        operation_time_amount : args.operation_time_amount,
        status : args.status,
        course_id : args.course_id,
      },
    ));
  },
};

export default makeUpClass;
