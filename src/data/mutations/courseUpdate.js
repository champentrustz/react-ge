import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import CourseItem from '../types/CourseItem';
import sequelize from '../sequelize';
import Course from '../models/Course';

const courseUpdate = {
  type: CourseItem,
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
    return sequelize.sync().then(() => Course.update({
        name : args.name,
        group_name : args.group_name,
      },
      {
        where : {
          code : args.code,
          section : args.section,
        }
      },
    ));
  },
};

export default courseUpdate;
