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

const Student = Model.define('Student', {
  ID: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataType.STRING,
  },
  firstName: {
    type: DataType.STRING,
  },
  lastName: {
    type: DataType.STRING,
  },
  deleteAt:{
    type: DataType.STRING,
  },
});

export default Student;
