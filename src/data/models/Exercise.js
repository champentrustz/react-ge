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

const Exercise = Model.define('exercise', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  course_id: {
    type: DataType.STRING,
  },
  section: {
    type: DataType.STRING,
  },
  name: {
    type: DataType.STRING,
  },
  amount: {
    type: DataType.INTEGER,
  },
  total_score:{
    type: DataType.FLOAT,
  },
});

export default Exercise;
