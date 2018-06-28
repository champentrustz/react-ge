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
import Teacher from './Teacher';

const title = 'Teacher';


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

async function action({ fetch }, context) {

checkTeacher();

  function getTeacherFirstName() {
    try {
      return sessionStorage.getItem('teacherFirstName');
    }
    catch(exception){
      return false
    }
  }

  function getTeacherLastName() {
    try {
      return sessionStorage.getItem('teacherLastName');
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

  function getTeacherID() {
    try {
      return sessionStorage.getItem('teacherID');
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
      return sessionStorage.getItem('courseEndTime');
    }
    catch(exception){
      return false
    }
  }

  function getGroupScheduleID() {
    try {
      return sessionStorage.getItem('groupScheduleID');
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

  const teacherID =  await getTeacherID();
  const teacherFirstName =  await getTeacherFirstName();
  const teacherLastName =  await getTeacherLastName();
  const courseDate =  await getCourseDate();
  const courseID =  await getCourseID();
  const courseSection =  await getCourseSection();
  const sectionName =  await getSectionName();
  const courseStartTime =  await getCourseStartTime();
  const courseEndTime =  await getCourseEndTime();
  const courseName =  await getCourseName();
  const groupScheduleID =  await getGroupScheduleID();
  const statusClass =  await getStatusClass();

  function TSSFetch(courseID,courseSection) {
    return fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/getStudentInGroup', {

      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        apiKey : "afab7e2f35fe11c45116e2315e7387b6",
        sReturn : "1",
        subject_id : courseID,
        group_id : courseSection
      }),
    });
  }


  function checkFetch(courseID,courseSection,courseStartTime,courseEndTime,courseDate) {
    return fetch('http://58.181.171.138/php/api/checkStudent.php', {

      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        course_id : courseID,
        course_section : courseSection,
        course_start : courseStartTime,
        course_end : courseEndTime,
        course_date : courseDate,

      }),
    });
  }


  function graphQLFetch(courseDate,courseID,courseSection) {
    return fetch('/graphql', {

      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'query{course(code:"'+courseID+'",section:"'+courseSection+'"){ID,code,name,checkinCode checkoutCode} ' +
        'question(courseID:"'+courseID+'",date:"' + courseDate + '",section:"'+courseSection+'"){ID,question,answer,vote}courseExercise(course_id:"'+courseID+'",section:"'+courseSection+'"){id,course_id,section,name,amount,total_score , exercise_question{id}}' +
        'exerciseStudentScore(course_id:"'+courseID+'",section:"'+courseSection+'") { id  name total_score exercise_student_score { id exercise_id student_id total_score } }' +
        'courseStudent(courseID:"'+courseID+'"){ID studentID{ID code firstName lastName exercise_score{id total_score exercise_id student_id}} semester year}}',
      }),
      credentials: 'include',
    });
  }
  const resp = await graphQLFetch(courseDate,courseID,courseSection);
  const { data } = await resp.json();

  const respTSS = await TSSFetch(courseID,courseSection);
  const  dataTSS  = await respTSS.json();

  const respCheck = await checkFetch(courseID,courseSection,courseStartTime,courseEndTime,courseDate);
  const  dataCheck  = await respCheck.json();

  return {
    chunks: ['teacher-course'],
    title,
    component: (
      <Layout>
          <Teacher course = {data.course} course_ID = {courseID} DATE = {courseDate} checkStudent = {dataCheck}
        question = {data.question} exercise = {data.courseExercise} exerciseStudentScore={data.exerciseStudentScore} contextDate={courseDate}
         courseStudent={dataTSS.data} courseID={courseID} courseSection={courseSection} courseName={courseName} sectionName={sectionName}
          courseStartTime={courseStartTime} courseEndTime={courseEndTime} teacherID={teacherID} groupScheduleID={groupScheduleID}
          keyActive={context.key} statusClass={statusClass}/>
      </Layout>
    ),
  };
}



export default action;
