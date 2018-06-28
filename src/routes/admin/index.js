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
import Admin from './Admin';

const title = 'Admin Page';
const isAdmin = false;


function checkAdmin() {
  try {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if(isAdmin !== 'true'){
      alert("ผิดพลาด! กรุณาเข้าสู่ระบบ");
      return window.location.replace("/");
    }
  }
  catch(exception){
    return false
  }
}

async function action({ fetch },context) {

  checkAdmin();


  function graphQLFetch() {
    return fetch('/graphql', {

      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ courseAll { ID code name section group_name}}',
      }),
      credentials: 'include',
    });
  }
  const resp = await graphQLFetch();
  const { data } = await resp.json();



  return {
    component: (
      <Layout>
        <Admin  courseAll={data.courseAll} keyActive={context.key}/>
      </Layout>
    ),
  };
}


export default action;
