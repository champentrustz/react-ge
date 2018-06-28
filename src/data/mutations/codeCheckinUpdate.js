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

const codeCheckinUpdate = {
  type: new List(CourseItem),
  args: {
    code : {
      type: GraphQLString,
    },
    section : {
      type: GraphQLString,
    },
    checkinCode:{
      type: GraphQLString,
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Course.update({
        checkinCode : args.checkinCode,

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

export default codeCheckinUpdate;
