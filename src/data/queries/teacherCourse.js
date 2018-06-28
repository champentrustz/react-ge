import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';


import TeacherCourseItem from '../types/CourseTeacherItem';
import sequelize from '../sequelize';
import TeacherCourse from '../models/CourseTeacher';
import Course from '../models/Course';
import Teacher from '../models/Teacher';


const teacherCourse = {
  type: new List(TeacherCourseItem),
  args : {
    teacherID : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => TeacherCourse.findAll({
      include: [
        { model: Course,}
      ],
      include: [
        { model: Teacher,}
      ],
      where:{
        teacherID : args.teacherID,
      }
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};


export default teacherCourse;
