import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as Integer,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CourseItem from '../types/CourseItem';
import Course from '../models/Course';
import TeacherItem from '../types/TeacherItem';
import Teacher from '../models/Teacher';
import sequelize from '../sequelize';


const TeacherCourseItem = new ObjectType({
  name: 'TeacherCourse',
  fields: {
    ID: {type: Integer},
    teacherID: {type : new List(TeacherItem), resolve(parent){
      return sequelize.sync().then(() => Teacher.findAll({
        where : {
            ID : parent.teacherID,
        },
      }))
    },},
    courseID: {type : new List(CourseItem), resolve(parent){
      return sequelize.sync().then(() => Course.findAll({
        where : {
          ID : parent.courseID,
        },
      }))
    },},
    semester: {type: Integer},
    year: {type: Integer},
  },
});



export default TeacherCourseItem;
