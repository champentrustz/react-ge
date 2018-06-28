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

const ExerciseQuestionChoice = Model.define('exercise_question_choice', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  exercise_question_id: {
    type: DataType.INTEGER,
  },
  choice: {
    type: DataType.STRING,
  },
  status: {
    type: DataType.ENUM,
    values:['RIGHT','WRONG']
  },
});

export default ExerciseQuestionChoice;
