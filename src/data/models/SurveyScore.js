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

const SurveyScore = Model.define('survey_score', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  survey_id: {
    type: DataType.INTEGER,
  },
  survey_question_id: {
    type: DataType.INTEGER,
  },
  student_id: {
    type: DataType.STRING,
  },
  course_id: {
    type: DataType.STRING,
  },
  group_id: {
    type: DataType.INTEGER,
  },
  student_gender: {
    type: DataType.STRING,
  },
  score: {
    type: DataType.FLOAT,
  },
  deletedAt: {
    type: DataType.STRING,
  },
});

export default SurveyScore;
