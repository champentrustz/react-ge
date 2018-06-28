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

const Survey = Model.define('survey', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  topic: {
    type: DataType.STRING,
  },
  teacher_name: {
    type: DataType.STRING,
  },
  amount: {
    type: DataType.STRING,
  },
  type: {
    type: DataType.ENUM,
    values:['TEACHER','TA','LECTURER']
  },
  deletedAt: {
    type: DataType.STRING,
  },
});

export default Survey;
