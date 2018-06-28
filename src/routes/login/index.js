/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
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
import Login from './Login';


const title = 'Log In';



async function action({ fetch }) {




  const resp = await fetch('/graphql', {

    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: '{ studentDetailAll { ID code  } teacherAll{ID code username password } teacherAssistantAll{ID code username password}' +
      'adminAll{id first_name last_name username password email}}',
    }),
    credentials: 'include',
  });
  const { data } = await resp.json();


  return {

    component: (
      <Layout>
        <Login />
      </Layout>
    ),
  };


}




export default action;
