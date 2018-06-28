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
import ManageCourse from './ManageCourse';


const isAdmin = true;

async function action({ fetch }) {
  if (!isAdmin) {
    return { redirect: '/login' };
  }

  const resp = await fetch('/graphql', {

    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: '{ courseAll { ID code name section startTime endTime totalAmount skipStatus}}',
    }),
    credentials: 'include',
  });
  const { data } = await resp.json();


  return {
    component: (
      <Layout>
        <ManageCourse  courseAll={data.courseAll}/>
      </Layout>
    ),
  };
}

export default action;
