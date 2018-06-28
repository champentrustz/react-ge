import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import StudentItem from '../types/StudentItem';
import sequelize from '../sequelize';
import Student from '../models/Student';


const studentDetail = {
  type: new List(StudentItem),
  args : {
    ID : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Student.findAll({
      where:{
        ID : args.ID,
      }
    })).then((dataArray) => {
      const result = dataArray.map(data => data.get({
        plain: true,
      }));

      return result;
    });
  },
};


export default studentDetail;
