import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as Integer,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CourseItem from '../types/CourseItem';
import Course from '../models/Course';
import StudentItem from '../types/StudentItem';
import Student from '../models/Student';
import sequelize from '../sequelize';


const StudentRegistationItem = new ObjectType({
  name: 'StudentRegistationItem',
  fields: {
    ID: {type: Integer},
    studentID:  {type : new List(StudentItem), resolve(parent){
      return sequelize.sync().then(() => Student.findAll({
        where : {
          ID : parent.studentID,
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



export default StudentRegistationItem;
