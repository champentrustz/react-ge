import {
  GraphQLList as List,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import TeacherAssistantItem from '../types/TeacherAssistantItem';
import sequelize from '../sequelize';
import TeacherAssistant from '../models/TeacherAssistant';
import Department from '../models/Department';


const teacherAssistantDetail = {
  type: new List(TeacherAssistantItem),
  args : {
    ID : {
      type : GraphQLString
    },
  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => TeacherAssistant.findAll({
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


export default teacherAssistantDetail;
