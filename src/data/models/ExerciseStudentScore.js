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

const ExerciseStudentScore = Model.define('exercise_student_score', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  exercise_id: {
    type: DataType.INTEGER,
  },
  student_id: {
    type: DataType.STRING,
  },
  total_score: {
    type: DataType.FLOAT,
  },
});

export default ExerciseStudentScore;
