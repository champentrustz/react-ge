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
import EditStudentTeacher from './EditStudentTeacher';

const isAdmin = true;

async function action({ fetch }, context) {
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
      query: '{ studentDetail(ID:'+context.ID+') { ID code firstName lastName departmentID { ID name facultyID {name}} } department{ID,name} teacherDetail(ID:'+context.ID+'){ID code firstName lastName departmentID{ID name facultyID{name}}} teacherAssistantDetail(ID:'+context.ID+'){ID code firstName lastName departmentID{ID name facultyID{name}}}}',
    }),
    credentials: 'include',
  });
  const { data } = await resp.json();


  return {
    component: (
      <Layout>
        <EditStudentTeacher  studentDetail={data.studentDetail} department={data.department}
                             teacherDetail={data.teacherDetail} teacherAssistantDetail={data.teacherAssistantDetail}
                             contextStatus={context.STATUS} contextID={context.ID}/>
      </Layout>
    ),
  };
}

export default action;
