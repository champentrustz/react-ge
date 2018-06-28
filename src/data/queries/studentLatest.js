import {
  GraphQLList as List,
  GraphQLInt

} from 'graphql';
import StudentItem from '../types/StudentItem';
import sequelize from '../sequelize';
import Student from '../models/Student';

const exerciseLatest = {
  type: new List(StudentItem),
  resolve(){
    return sequelize.sync().then(() => Student.findAll({
      limit : 1,
      order: [ [ 'createdAt', 'DESC' ]]
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default exerciseLatest;
