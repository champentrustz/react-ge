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
import TeacherAssistantCourse from './TeacherAssistantCourse';

const title = 'TeacherAssistant Course';

function checkTeacherAssistant() {
  try {
    const isTeacher = sessionStorage.getItem('isTeacherAssistant');
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

  checkTeacherAssistant();

  function getTeacherAssistantUsername() {
    try {
      return sessionStorage.getItem('teacherAssistantUsername');
    }
    catch(exception){
      return false
    }
  }
  function getTeacherAssistantPassword() {
    try {
      return sessionStorage.getItem('teacherAssistantPassword');
    }
    catch(exception){
      return false
    }
  }

  const teacherAssistantUsername =  await getTeacherAssistantUsername();
  const teacherAssistantPassword =  await getTeacherAssistantPassword();


  function TSSFetch(teacherAssistantUsername,teacherAssistantPassword){

    return fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/talogin', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey : "afab7e2f35fe11c45116e2315e7387b6",
        sReturn : "1",
        ta_username : teacherAssistantUsername,
        ta_password : teacherAssistantPassword
      }),
    });

  }

  const resp = await TSSFetch(teacherAssistantUsername,teacherAssistantPassword);
  const  data  = await resp.json();
  return {
    component: (
      <Layout>
        <TeacherAssistantCourse teacherAssistantData={data.data}/>
      </Layout>
    ),
  };
}

export default action;
