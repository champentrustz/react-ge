import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import QuestionItem from '../types/CourseQuestionItem';

import sequelize from '../sequelize';
import Question from '../models/CourseQuestion';

const answerCreate = {
  type: QuestionItem,
  args: {
    ID:{
      type: GraphQLInt,
    },
    answer:{
      type: GraphQLString,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Question.update({
      answer : args.answer,
    },
    {
      where : {
        ID : args.ID,
      }
    }
    ));
  },
};

export default answerCreate;
