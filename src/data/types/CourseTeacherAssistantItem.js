import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as Integer,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CourseItem from '../types/CourseItem';
import Course from '../models/Course';
import TeacherAssistantItem from './TeacherAssistantItem';
import TeacherAssistant from '../models/TeacherAssistant';
import sequelize from '../sequelize';


const CourseTeacherAssistant = new ObjectType({
  name: 'CourseTeacherAssistant',
  fields: {
    ID: {type: Integer},
    teacherAssistantID: {type : new List(TeacherAssistantItem), resolve(parent){
      return sequelize.sync().then(() => TeacherAssistant.findAll({
        where : {
          ID : parent.teacherAssistantID,
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



export default CourseTeacherAssistant;
