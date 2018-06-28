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

const SurveyCourse = Model.define('survey_course', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  survey_id: {
    type: DataType.INTEGER,
  },
  course_id: {
    type: DataType.STRING,
  },
  group_id: {
    type: DataType.INTEGER,
  },
  name: {
    type: DataType.STRING,
  },
  deletedAt: {
    type: DataType.STRING,
  },
});

export default SurveyCourse;
