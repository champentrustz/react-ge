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

const CheckStudent = Model.define('course_checkstudent', {
  ID: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  courseID: {
    type: DataType.STRING,
  },
  section: {
    type: DataType.STRING,
  },
  studentID: {
    type: DataType.STRING,
  },
  firstName: {
    type: DataType.STRING,
  },
  lastName: {
    type: DataType.STRING,
  },
  status: {
    type: DataType.ENUM,
    values:['NORMAL','LATE','ABSENT']
  },
  ipAddress: {
    type: DataType.STRING,
  },
  note: {
    type: DataType.STRING,
  },
  checkinDate: {
    type: DataType.STRING,
  },
  checkoutDate: {
    type: DataType.STRING,
  },
  teacherID: {
    type: DataType.STRING,
  }

});

export default CheckStudent;
