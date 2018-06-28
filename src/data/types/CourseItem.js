import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as Integer,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

import CourseMakeupItem from '../types/CourseMakeupItem';
import CourseMakeup from '../models/CourseMakeup';
import sequelize from '../sequelize';

const CourseItem = new ObjectType({
  name: 'CourseItem',
  fields: {
    ID: {type: Integer},
    code: {type: StringType},
    name: {type: StringType},
    section: {type: StringType},
    group_name: {type: StringType},
    startTime: {type: StringType},
    endTime: {type: StringType},
    startDate: {type: StringType},
    skipStatus: {type: StringType},
    totalAmount: {type: Integer},
    checkinCode: {type: StringType},
    checkoutCode: {type: StringType},
    deleteAt: {type: StringType},
    courseMakeup_id:  {type : new List(CourseMakeupItem), resolve(parent){
      return sequelize.sync().then(() => CourseMakeup.findAll({
        where : {
          course_id : parent.ID,
        },
      }))
    },},
  },
});

export default CourseItem;
