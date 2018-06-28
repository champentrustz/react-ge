import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import StudentItem from '../types/StudentItem';
import sequelize from '../sequelize';
import Student from '../models/Student';


const studentDetailAll = {
  type: new List(StudentItem),
  resolve() {
    return sequelize.sync().then(() => Student.findAll({
      where: {
        deleteAt : null
      }
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};


export default studentDetailAll;
