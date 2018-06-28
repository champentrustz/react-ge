import {GraphQLList as List} from 'graphql';
import FacultyItem from '../types/FacultyItemType';

import sequelize from '../sequelize';
import Faculty from '../models/Faculty';

const faculty = {
  type: new List(FacultyItem),
  resolve() {
    return sequelize.sync().then(() => Faculty.findAll({
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};

export default faculty;
