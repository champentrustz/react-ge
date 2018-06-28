/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const SurveyQuestion = Model.define('survey_question', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  survey_id: {
    type: DataType.INTEGER,
  },
  topic_id: {
    type: DataType.INTEGER,
  },
  question: {
    type: DataType.STRING,
  },
  type: {
    type: DataType.ENUM,
    values:['QUESTION','TOPIC']
  },
  deletedAt: {
    type: DataType.STRING,
  },
});

export default SurveyQuestion;
