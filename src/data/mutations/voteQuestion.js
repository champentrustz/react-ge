import {
  GraphQLList as List,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import QuestionItem from '../types/CourseQuestionItem';

import sequelize from '../sequelize';
import Question from '../models/CourseQuestion';

const voteQuestion = {
  type: QuestionItem,
  args: {
    ID:{
      type: GraphQLInt,
    },

  },
  resolve : function(_,args) {
    return sequelize.sync().then(() => Question.update({
        vote: sequelize.literal('vote +1')
      },
      {
        where : {
          ID : args.ID,
        }
      }
    ));
  },
};

export default voteQuestion;
