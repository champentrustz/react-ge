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

const TeacherAssistant = Model.define('teacherAssistant', {
  ID: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataType.STRING(255),
  },
  username: {
    type: DataType.STRING(255),
  },

  password: {
    type: DataType.STRING(255),
  },
  firstName: {
    type: DataType.STRING,
  },
  lastName:{
    type: DataType.STRING,
  },
  departmentID:{
    type: DataType.INTEGER,
  },
});

export default TeacherAssistant;
