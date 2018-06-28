import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import AdminItem from '../types/AdminItem';
import sequelize from '../sequelize';
import Admin from '../models/Admin';


const adminDetail = {
  type: new List(AdminItem),
  args : {
    id : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Admin.findAll({
      where:{
        id : args.id,
      }
    })).then((dataArray) => {
        const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};


export default adminDetail;
