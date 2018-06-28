import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLList as List,
} from 'graphql';

import FacultyItem from '../types/FacultyItemType';
import Faculty from '../models/Faculty';
import sequelize from '../sequelize';


const DepartmentItem = new ObjectType({
  name: 'DepartmentItem',
  fields: {
    ID: {type: Integer},
    name: {type:StringType},
    facultyID : {type : new List(FacultyItem), resolve(parent){
      return sequelize.sync().then(() => Faculty.findAll({
        where : {
          ID : parent.facultyID,
        },
      }))
    },},
  },
});

export default DepartmentItem;
