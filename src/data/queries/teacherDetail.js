import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import TeacherItem from '../types/TeacherItem';
import sequelize from '../sequelize';
import Teacher from '../models/Teacher';
import Department from '../models/Department';


const teacherDetail = {
  type: new List(TeacherItem),
  args : {
    ID : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Teacher.findAll({
      include: [
        { model: Department,}
      ],
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


export default teacherDetail;
