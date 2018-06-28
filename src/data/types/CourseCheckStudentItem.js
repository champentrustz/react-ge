import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as Integer,
  GraphQLList as List,
  GraphQLString as String,
  GraphQLNonNull as NonNull,
} from 'graphql';
import CourseItem from '../types/CourseItem';
import Course from '../models/Course';
import StudentItem from '../types/StudentItem';
import Student from '../models/Student';
import sequelize from '../sequelize';


const StudentRegistation = new ObjectType({
  name: 'StudentRegistation',
  fields: {
    ID: {type: Integer},
    courseID: {type : String},
    section: {type : String},
    studentID:  {type :String},
    firstName: {type : String},
    lastName: {type : String},
    status: {type: String},
    ipAddress: {type: String},
    note: {type: String},
    checkinDate: {type: String},
    checkoutDate: {type: String},
    teacherID: {type: String},

  },
});



export default StudentRegistation;
