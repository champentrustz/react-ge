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
import TeacherAssistant from './TeacherAssistant';

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

async function action({ fetch }, context) {

  checkTeacherAssistant();

  function getTeacherAssistantFirstName() {
    try {
      return sessionStorage.getItem('teacherAssistantFirstName');
    }
    catch(exception){
      return false
    }
  }

  function getTeacherAssistantLastName() {
    try {
      return sessionStorage.getItem('teacherAssistantLastName');
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

  function getSectionName() {
    try {
      return sessionStorage.getItem('sectionName');
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
      return sessionStorage.getItem('CourseEndTime');
    }
    catch(exception){
      return false
    }
  }

  function getStatusClass() {
    try {
      return sessionStorage.getItem('statusClass');
    }
    catch(exception){
      return false
    }
  }

  const teacherFirstName =  await getTeacherAssistantFirstName();
  const teacherLastName =  await getTeacherAssistantLastName()
  const courseDate =  await getCourseDate();
  const courseID =  await getCourseID();
  const courseSection =  await getCourseSection();
  const sectionName =  await getSectionName();
  const courseStartTime =  await getCourseStartTime();
  const courseEndTime =  await getCourseEndTime();
  const courseName =  await getCourseName();
  const statusClass =  await getStatusClass();


  function graphQLFetch(courseDate,courseID,courseSection) {
    return fetch('/graphql', {

      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'query{courseExercise(course_id:"'+courseID+'",section:"'+courseSection+'"){id,course_id,section,name,amount,total_score , exercise_question{id}}' +
        'checkStudent(courseID:"'+courseID+'",section:"'+courseSection+'",checkinDate:"' +courseDate+'") { ID,note,studentID firstName lastName status,ipAddress }' +
        'course(code:"'+courseID+'",section:"'+courseSection+'"){ID,code,name,checkinCode}}',
      }),
      credentials: 'include',
    });
  }
  const resp = await graphQLFetch(courseDate,courseID,courseSection);
  const { data } = await resp.json();

  return {
    component: (
      <Layout>
        <TeacherAssistant  exercise = {data.courseExercise} checkStudent = {data.checkStudent} DATE={courseDate}
                          course = {data.course} courseID={courseID} courseName={courseName} courseSection={courseSection} sectionName={sectionName}
                          keyActive={context.key} statusClass={statusClass}/>
      </Layout>
    ),
  };
}

export default action;
