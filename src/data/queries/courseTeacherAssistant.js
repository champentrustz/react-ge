import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';


import CourseTeacherAssistantItem from '../types/CourseTeacherAssistantItem';
import sequelize from '../sequelize';
import CourseTeacherAssistant from '../models/CouseTeacherAssistant';
import Course from '../models/Course';
import TeacherAssistant from '../models/TeacherAssistant';


const courseTeacherAssistant = {
  type: new List(CourseTeacherAssistantItem),
  args : {
    teacherAssistantID : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CourseTeacherAssistant.findAll({
      include: [
        { model: Course,}
      ],
      include: [
        { model: TeacherAssistant,}
      ],
      where:{
        teacherAssistantID : args.teacherAssistantID,
      }
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};


export default courseTeacherAssistant;
