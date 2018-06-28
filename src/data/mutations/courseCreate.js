import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import CourseItem from '../types/CourseItem';

import sequelize from '../sequelize';
import Course from '../models/Course';

const courseCreate = {
  type: new List(CourseItem),
  args: {

    code:{
      type: GraphQLString,
    },
    name:{
      type: GraphQLString,
    },
    section:{
      type: GraphQLInt,
    },
    group_name:{
      type: GraphQLString,
    },


  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Course.create({
      code : args.code,
      name : args.name,
      section : args.section,
      group_name : args.group_name,

    }));
  },
};

export default courseCreate;
