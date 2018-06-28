import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import TeacherAssistantItem from '../types/TeacherAssistantItem';
import sequelize from '../sequelize';
import TeacherAssistant from '../models/TeacherAssistant';
import Department from '../models/Department';


const teacherAssistantAll = {
  type: new List(TeacherAssistantItem),
  resolve() {
    return sequelize.sync().then(() => TeacherAssistant.findAll({
      include: [
        { model: Department,}
      ],
      order: [
        [{model: Department, }, 'ID', 'ASC'],
        ['code','ASC'],
      ]
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};


export default teacherAssistantAll;
