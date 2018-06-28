import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as Integer,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

import DepartmentItem from '../types/DepartmentItem';
import Department from '../models/Department';
import sequelize from '../sequelize';

const TeacherAssistantItem = new ObjectType({
  name: 'TeacherAssistantItem',
  fields: {
    ID: {type: Integer},
    code: {type: StringType},
    username: {type: StringType},
    password: {type: StringType},
    firstName: {type: StringType},
    lastName: {type: StringType},
    departmentID: {type : new List(DepartmentItem), resolve(parent){
      return sequelize.sync().then(() => Department.findAll({
        where : {
          ID : parent.departmentID,
        },
      }))
    },},
  },
});

export default TeacherAssistantItem;
