import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from 'graphql';

const FacultyItemType = new ObjectType({
  name: 'FacultyItem',
  fields: {
    ID: {type: Integer},
    name: {type:StringType},
  },
});

export default FacultyItemType;
