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

const CourseMakeup = Model.define('course_makeup', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  course_id: {
    type: DataType.INTEGER,
  },
  operation_date : {
    type: DataType.STRING,
  },
  operation_start: {
    type: DataType.TIME,
  },
  operation_time_amount:{
    type: DataType.INTEGER,
  },
  status: {
    type: DataType.ENUM,
    values:['CANCEL','MAKEUP']
  },
  created_by: {
    type: DataType.INTEGER,
  },
});

export default CourseMakeup;
