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
import StudentCourse from './StudentCourse';

const title = 'Student Course';

function checkStudent() {
  try {
    const isStudent = sessionStorage.getItem('isStudent');
    if(isStudent !== 'true'){
      alert("ผิดพลาด! กรุณาเข้าสู่ระบบ");
      return window.location.replace("/");
    }
  }
  catch(exception){
    return false
  }
}


async function action({ fetch }) {

 checkStudent();

  function getStudentUsername() {
    try {
      return sessionStorage.getItem('studentUsername');
    }
    catch(exception){
      return false
    }
  }

  function getStudentPassword() {
    try {
      return sessionStorage.getItem('studentPassword');
    }
    catch(exception){
      return false
    }
  }

  const studentUsername =  await getStudentUsername();
  const studentPassword =  await getStudentPassword();


  function TSSFetch(studentUsername,studentPassword){

    return fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/studentlogin', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey : "afab7e2f35fe11c45116e2315e7387b6",
        sReturn : "1",
        student_username : studentUsername,
        student_password : studentPassword
      }),
    });

  }

  const resp = await TSSFetch(studentUsername,studentPassword);
  const  data  = await resp.json();
  return {
    chunks: ['student-course'],
    title,
    component: (
      <Layout>
        <StudentCourse studentData={data.data}/>
      </Layout>
    ),
  };
}

export default action;

