import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as Integer,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

import CourseItem from '../types/CourseItem';
import Course from '../models/Course';
import sequelize from '../sequelize';


const RoomItem = new ObjectType({
  name: 'RoomItem',
  fields: {
    id: {type: Integer},
    name: {type: StringType},
  },

});

export default RoomItem;
