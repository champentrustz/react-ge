import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import CourseMakeupItem from '../types/CourseMakeupItem';

import sequelize from '../sequelize';
import CourseMakeup from '../models/CourseMakeup';

const cancelClass = {
  type: CourseMakeupItem,
  args: {
    course_id:{
      type: GraphQLInt,
    },
    operation_date:{
      type: GraphQLString,
    },
    status:{
      type: GraphQLString,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CourseMakeup.create({
        operation_date : args.operation_date,
        status : args.status,
        course_id : args.course_id,
      },
    ));
  },
};

export default cancelClass;
