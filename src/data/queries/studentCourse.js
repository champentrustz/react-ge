import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import StudentRegistrationItem from '../types/CourseStudentItem';
import sequelize from '../sequelize';
import StudentRegistration from '../models/CourseStudent';
import Course from '../models/Course';


const studentCourse = {
  type: new List(StudentRegistrationItem),
  args : {
    studentID : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => StudentRegistration.findAll({
      include: [
        { model: Course,}
      ],
      where:{
        studentID : args.studentID,
      }
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};


export default studentCourse;
