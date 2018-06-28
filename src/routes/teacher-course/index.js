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
import TeacherCourse from './TeacherCourse';

const title = 'Teacher Course';

function checkTeacher() {
  try {
    const isTeacher = sessionStorage.getItem('isTeacher');
    if(isTeacher !== 'true'){
      alert("ผิดพลาด! กรุณาเข้าสู่ระบบ");
      return window.location.replace("/");
    }
  }
  catch(exception){
    return false
  }
}

async function action({ fetch }) {

  checkTeacher();

  function getTeacherUsername() {
    try {
      return sessionStorage.getItem('teacherUsername');
    }
    catch(exception){
      return false
    }
  }
  function getTeacherPassword() {
    try {
      return sessionStorage.getItem('teacherPassword');
    }
    catch(exception){
      return false
    }
  }

  const teacherUsername =  await getTeacherUsername();
  const teacherPassword =  await getTeacherPassword();


  function TSSFetch(teacherUsername,teacherPassword){

    return fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/teacherlogin', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey : "afab7e2f35fe11c45116e2315e7387b6",
        sReturn : "1",
        teacher_username : teacherUsername,
        teacher_password : teacherPassword
      }),
    });

  }

  const resp = await TSSFetch(teacherUsername,teacherPassword);
  const  data  = await resp.json();
  return {
    chunks: ['teacher-course'],
    component: (
      <Layout>
        <TeacherCourse teacherData={data.data}/>
      </Layout>
    ),
  };
}

export default action;
