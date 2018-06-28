import {GraphQLList as List} from 'graphql';
import DepartmentItem from '../types/DepartmentItem';

import sequelize from '../sequelize';
import Department from '../models/Department';
import Faculty from '../models/Faculty';


const department = {
  type: new List(DepartmentItem),
  resolve() {
    return sequelize.sync().then(() => Department.findAll({
      include: [
        { model: Faculty,}
      ],
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default department;
