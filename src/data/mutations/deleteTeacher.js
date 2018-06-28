import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import TeacherItem from '../types/TeacherItem';

import sequelize from '../sequelize';
import Teacher from '../models/Teacher';

const deleteTeacher = {
  type: TeacherItem,
  args: {
    ID:{
      type: GraphQLInt,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Teacher.destroy({
        where :{
          ID : args.ID,
        }
      },
    ));
  },
};

export default deleteTeacher;
