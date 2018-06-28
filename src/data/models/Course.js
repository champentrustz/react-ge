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

const Course = Model.define('Course', {
  ID: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataType.STRING(255),
  },
  name: {
    type: DataType.STRING(255),
  },
  section: {
    type: DataType.STRING,
  },
  group_name: {
    type: DataType.STRING,
  },
  startTime: {
    type: DataType.TIME,
  },
  endTime: {
    type: DataType.TIME,
  },
  startDate: {
    type: DataType.DATEONLY,
  },
  skipStatus: {
    type: DataType.ENUM,
    values:['NORMAL','SKIP']

  },
  totalAmount: {
    type: DataType.INTEGER,
  },
  checkinCode: {
    type: DataType.STRING,
  },
  checkoutCode: {
    type: DataType.STRING,
  },
  deleteAt:{
    type: DataType.STRING,
  },
});

export default Course;
