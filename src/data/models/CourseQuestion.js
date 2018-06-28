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

const Question = Model.define('course_question', {
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
  question: {
    type: DataType.TEXT,
  },
  answer: {
    type: DataType.TEXT,
  },
  vote: {
    type: DataType.INTEGER,
  },
  date: {
    type: DataType.DATEONLY,
  },

});

export default Question;
