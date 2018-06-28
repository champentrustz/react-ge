import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as Integer,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';


const AdminItem = new ObjectType({
  name: 'AdminItem',
  fields: {
    id: {type: Integer},
    first_name: {type: StringType},
    last_name: {type: StringType},
    username: {type: StringType},
    password: {type: StringType},
    email: {type: StringType},
  },
});

export default AdminItem;
