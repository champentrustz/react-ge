import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import CourseMakeUpItem from '../types/CourseMakeupItem';

import sequelize from '../sequelize';
import CourseMakeUp from '../models/CourseMakeup';

const deleteCourseMakeUpCancel = {
  type: CourseMakeUpItem,
  args: {
    id:{
      type: GraphQLInt,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => CourseMakeUp.destroy({
        where :{
          id : args.id,
        }
      },
    ));
  },
};

export default deleteCourseMakeUpCancel;
