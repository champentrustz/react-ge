/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Exercise from './exerciseQuestion';

const isTeacherAssistant = true;
const isTeacher = true;

async function action({ fetch }, context) {
  if (!isTeacherAssistant || !isTeacher) {
    return { redirect: '/login' };
  }

  const resp = await fetch('/graphql', {

    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: 'query{exerciseDetail(id:'+context.ID+'){id,name,amount} exerciseQuestionLatest(exercise_id:'+context.ID+'){id}}',
    }),
    credentials: 'include',
  });
  const { data } = await resp.json();

  return {
    component: (
      <Layout>
        <Exercise exercise_detail = {data.exerciseDetail}  exercise_ID = {context.ID}/>
      </Layout>
    ),
  };
}

export default action;
