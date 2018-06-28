import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLInt as Integer,
} from 'graphql';

import CourseItem from '../types/CourseItem';
import Course from '../models/Course';
import sequelize from '../sequelize';

const CourseMakeupItem = new ObjectType({
  name: 'CourseMakeupItem',
  fields: {
    id: {type: Integer},
    course_id : {type: Integer},
    operation_date : {type: StringType},
    operation_start : {type: StringType},
    operation_time_amount : {type: Integer},
    status : {type: StringType},
    created_by : {type: Integer},
  },
});

export default CourseMakeupItem;
