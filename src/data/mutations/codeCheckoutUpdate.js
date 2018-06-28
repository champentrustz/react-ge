import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import CourseItem from '../types/CourseItem';

import sequelize from '../sequelize';
import Course from '../models/Course';

const codeCheckoutUpdate = {
  type: new List(CourseItem),
  args: {
    code : {
      type: GraphQLString,
    },
    section : {
      type: GraphQLString,
    },
    checkoutCode:{
      type: GraphQLString,
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Course.update({
        checkoutCode : args.checkoutCode,

      },
      {
        where : {
          code : args.code,
          section : args.section,
        }
      }
    ));
  },
};

export default codeCheckoutUpdate;
