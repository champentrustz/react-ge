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

const CourseTeacherAssistant = Model.define('course_teacherAssistant', {
  ID: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  courseID: {
    type: DataType.INTEGER,
  },
  teacherAssistantID: {
    type: DataType.INTEGER,
  },
  semester: {
    type: DataType.INTEGER,
  },
  year:{
    type: DataType.INTEGER,
  },

});

export default CourseTeacherAssistant;
