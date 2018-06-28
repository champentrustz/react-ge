import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import TeacherAssistantItem from '../types/TeacherAssistantItem';

import sequelize from '../sequelize';
import TeacherAssistant from '../models/TeacherAssistant';

const deleteTeacherAssistant = {
  type: TeacherAssistantItem,
  args: {
    ID:{
      type: GraphQLInt,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => TeacherAssistant.destroy({
        where :{
          ID : args.ID,
        }
      },
    ));
  },
};

export default deleteTeacherAssistant;
