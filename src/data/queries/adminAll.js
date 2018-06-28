import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import AdminItem from '../types/AdminItem';
import sequelize from '../sequelize';
import Admin from '../models/Admin';
import Department from '../models/Department';


const adminAll = {
  type: new List(AdminItem),
  resolve() {
    return sequelize.sync().then(() => Admin.findAll({
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};


export default adminAll;
