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
import StudentExercise from './StudentExercise';

async function action({ fetch }, context) {


  const resp = await fetch('/graphql', {

    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: 'query{exerciseDetail(id:'+context.EXERCISE_ID+'){id,name,amount,total_score}exerciseQuestionDetail(exercise_id:'+context.EXERCISE_ID+'){id,question,' +
        'score,exercise_question_choice_id{id,choice,status}}}',
    }),
    credentials: 'include',
  });
  const { data } = await resp.json();

  return {
    component: (
      <Layout>
        <StudentExercise exercise_detail = {data.exerciseDetail}  exercise_ID = {context.EXERCISE_ID} exerciseQuestion={data.exerciseQuestionDetail}
        student_ID={context.STUDENT_ID}/>
      </Layout>
    ),
  };
}

export default action;
