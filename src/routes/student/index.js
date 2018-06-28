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
import Student from './Student';


const title = 'Student Page';

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


async function action({ fetch }, context) {

  checkStudent();

  function getStudentID() {
    try {
      return sessionStorage.getItem('studentUsername');
    }
    catch(exception){
      return false
    }
  }

  function getStudentFirstName() {
    try {
      return sessionStorage.getItem('studentFirstName');
    }
    catch(exception){
      return false
    }
  }

  function getStudentLastName() {
    try {
      return sessionStorage.getItem('studentLastName');
    }
    catch(exception){
      return false
    }
  }

  function getCourseStatus() {
    try {
      return sessionStorage.getItem('courseStatus');
    }
    catch(exception){
      return false
    }
  }

  function getCourseDate() {
    try {
      return sessionStorage.getItem('courseDate');
    }
    catch(exception){
      return false
    }
  }

  function getCourseID() {
    try {
      return sessionStorage.getItem('courseID');
    }
    catch(exception){
      return false
    }
  }

  function getCourseName() {
    try {
      return sessionStorage.getItem('courseName');
    }
    catch(exception){
      return false
    }
  }

  function getCourseSection() {
    try {
      return sessionStorage.getItem('courseSection');
    }
    catch(exception){
      return false
    }
  }

  function getCourseStartTime() {
    try {
      return sessionStorage.getItem('courseStartTime');
    }
    catch(exception){
      return false
    }
  }

  function getCourseEndTime() {
    try {
      return sessionStorage.getItem('courseEndTime');
    }
    catch(exception){
      return false
    }
  }

  function getStudentGender() {
    try {
      return sessionStorage.getItem('studentGender');
    }
    catch(exception){
      return false
    }
  }

  function getCourseSemester() {
    try {
      return sessionStorage.getItem('semester');
    }
    catch(exception){
      return false
    }
  }

  function getCourseYear() {
    try {
      return sessionStorage.getItem('year');
    }
    catch(exception){
      return false
    }
  }

  const studentID =  await getStudentID();
  const studentFirstName =  await getStudentFirstName();
  const studentLastName =  await getStudentLastName();
  const studentGender =  await getStudentGender();
  const courseStatus =  await getCourseStatus();
  const courseDate =  await getCourseDate();
  const courseID =  await getCourseID();
  const courseSection =  await getCourseSection();
  const courseStartTime =  await getCourseStartTime();
  const courseEndTime =  await getCourseEndTime();
  const courseName =  await getCourseName();
  const semester =  await getCourseSemester();
  const year =  await getCourseYear();


  function graphQLFetch(courseDate,courseID,studentID,courseSection) {
    return fetch('/graphql', {

      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'query{question(courseID:"'+ courseID + '",date:"' + courseDate + '",section:"'+courseSection+'"){ID,question,answer,vote}course(code:"' + courseID + '",section:"'+courseSection+'"){ID,code,name,checkinCode,startTime,endTime}' +
        'checkStatus(courseID:"' + courseID + '",studentID:"' + studentID + '",checkinDate:"' + courseDate + '",section:"'+courseSection+'") { ID,status,note,checkinDate,checkoutDate} ' +
        ' courseExercise(course_id:"' + courseID + '",section:"'+courseSection+'"){id,course_id,name,amount,total_score}' +
        'questionStudent(courseID:"' + courseID + '",date:"' + courseDate + '",studentID:"' + studentID + '",section:"'+courseSection+'"){ID,question,answer,vote}' +
        'questionOtherStudent(courseID:"' + courseID + '",date:"' + courseDate + '",studentID:"' + studentID + '",section:"'+courseSection+'"){ID,question,answer,vote}' +
        'individualStudentScore(student_id:"' + studentID + '"){id exercise_id}}',
      }),
      credentials: 'include',
    });
  }
  const resp = await graphQLFetch(courseDate,courseID,studentID,courseSection);
  const { data } = await resp.json();



  return {
    chunks: ['student'],
    component: (
      <Layout>
        <Student question={data.question} course={data.course} title={title} course_ID={courseID}
        checkStatus = {data.checkStatus} course_DATE={courseDate} course_STATUS={courseStatus}
         student_ID={studentID} exercise={data.courseExercise}
        questionStudent={data.questionStudent} questionOtherStudent={data.questionOtherStudent}
         individualStudentScore={data.individualStudentScore} courseStartTime={courseStartTime} courseEndTime={courseEndTime}
        courseName={courseName} courseID={courseID} courseSection={courseSection} studentID={studentID} courseDate={courseDate}
        studentFirstName={studentFirstName} studentLastName={studentLastName} studentGender={studentGender} keyActive={context.key}
        semester={semester} year={year}/>
      </Layout>
    ),
  };
}

export default action;
