import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import TeacherItem from '../types/TeacherItem';
import sequelize from '../sequelize';
import Teacher from '../models/Teacher';
import Department from '../models/Department';


const teacherAll = {
  type: new List(TeacherItem),
  resolve() {
    return sequelize.sync().then(() => Teacher.findAll({
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


export default teacherAll;
