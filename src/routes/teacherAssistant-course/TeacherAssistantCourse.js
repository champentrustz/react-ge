/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TeacherAssistantCourse.css';
import {Col, Row, Grid, Button, Thumbnail} from 'react-bootstrap';

let teacherAssistantCourse = [];

class TeacherAssistantCourse extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    courseTeacherAssistant: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    teacherAssistantID: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      showCourse: '0',
    };

  }

  alertNoClass = event =>{
    alert("ในขณะนี้ยังไม่มีคาบเรียน ไม่สามารถเข้าห้องเรียนได้");
  }

  componentDidMount() {

    const d = new Date();
    const mm = ("0" + (d.getMonth() + 1)).slice(-2);
    const dd = ("0" + (d.getDate())).slice(-2);
    const yyyy = d.getFullYear();
    const today = yyyy + '-' + mm + '-' + dd; //(US)
    const timeToday = new Date().toLocaleTimeString('en-US', {hour12: false});
    let haveCourse = null;
    let scheduleStartTime = null;
    let scheduleEndTime = null;
    let scheduleStartTimeNext = null;
    let scheduleEndTimeNext = null;
    let year = null;
    let semester = null;

    const teacherAssistantData = this.props.teacherAssistantData;
    teacherAssistantData.aSubject.map((teacherAssistantSubject, indexSubject) => {

      semester = teacherAssistantSubject.ayear_term;
      year = teacherAssistantSubject.ayear_year;


      teacherAssistantSubject.aGroup.map((teacherAssistantGroup, indexGroup) => {

        haveCourse = 0;

        teacherAssistantGroup.aSchedule.map((teacherAssistantSchedule, indexSchedule) => {

          let timeHourStart = parseInt(teacherAssistantSchedule.group_schedule_time_start.substring(0,2))-1;
          timeHourStart = ("0" + (timeHourStart)).slice(-2);
          let timeMinuteStart = teacherAssistantSchedule.group_schedule_time_start.substring(3,5);
          let timeSecondStart = teacherAssistantSchedule.group_schedule_time_start.substring(6,8);
          let timeStart = timeHourStart+':'+timeMinuteStart+':'+timeSecondStart;

          let timeHourEnd = parseInt(teacherAssistantSchedule.group_schedule_time_stop.substring(0,2))+1;
          timeHourEnd = ("0" + (timeHourEnd)).slice(-2);
          let timeMinuteEnd = teacherAssistantSchedule.group_schedule_time_stop.substring(3,5);
          let timeSecondEnd = teacherAssistantSchedule.group_schedule_time_stop.substring(6,8);
          let timeEnd = timeHourEnd+':'+timeMinuteEnd+':'+timeSecondEnd;

          if (teacherAssistantSchedule.group_schedule_date === today ) {



            if(timeToday >= timeStart && timeToday <= timeEnd){

              haveCourse = 1;
              scheduleStartTime = teacherAssistantSchedule.group_schedule_time_start.substring(0, 5);
              scheduleEndTime = teacherAssistantSchedule.group_schedule_time_stop.substring(0, 5);
            }




          }

          // else {
          //
          //   scheduleStartTime = teacherAssistantSchedule.group_schedule_time_start.substring(0, 5);
          //   scheduleEndTime = teacherAssistantSchedule.group_schedule_time_stop.substring(0, 5);
          //
          // }

        })

        if (haveCourse === 1) {
          teacherAssistantCourse.push(<Col md={4}>
            <Thumbnail>
              <h4>{teacherAssistantSubject.subjectName}</h4>
              <p>รหัสวิชา : {teacherAssistantSubject.subjectID}</p>
              <p>กลุ่มเรียน : {teacherAssistantGroup.groupName}</p>
              <p>เวลา: {scheduleStartTime} - {scheduleEndTime} น.</p>
              <p>
                <Row>
                  <Col md={6}>
                    <Button bsStyle="success" block
                            onClick={this.intoClass.bind(this, teacherAssistantSubject.subjectID, teacherAssistantGroup.groupID, teacherAssistantGroup.groupName ,today, teacherAssistantSubject.subjectName, scheduleStartTime, scheduleEndTime , year , semester)}>เข้าห้องเรียน</Button>

                  </Col>
                  <Col md={6}>
                    <Button bsStyle="warning" block
                            onClick={this.intoClassManage.bind(this, teacherAssistantSubject.subjectID, teacherAssistantGroup.groupID, teacherAssistantGroup.groupName ,today, teacherAssistantSubject.subjectName, scheduleStartTime, scheduleEndTime , year , semester)}>จัดการห้องเรียน</Button>

                  </Col>
                </Row>

              </p>
            </Thumbnail>
          </Col>)
        }
        if (haveCourse === 0) {

          teacherAssistantCourse.push(<Col md={4}>
            <Thumbnail>
              <h4>{teacherAssistantSubject.subjectName}</h4>
              <p>รหัสวิชา : {teacherAssistantSubject.subjectID}</p>
              <p>กลุ่มเรียน : {teacherAssistantGroup.groupName}</p>
              <p>เวลา: <span className="text-danger">ในขณะนี้ยังไม่มีคาบเรียน</span> </p>
              <p>

                <Row>
                  <Col md={6}>
                    <Button bsStyle="danger" block onClick={this.alertNoClass.bind(this)}>เข้าห้องเรียน</Button>
                  </Col>
                  <Col md={6}>
                    <Button bsStyle="warning" block
                            onClick={this.intoClassManage.bind(this, teacherAssistantSubject.subjectID, teacherAssistantGroup.groupID, teacherAssistantGroup.groupName ,today, teacherAssistantSubject.subjectName, scheduleStartTime, scheduleEndTime , year , semester)}>จัดการห้องเรียน</Button>

                  </Col>
                </Row>


            </p>
            </Thumbnail>
          </Col>)

          // studentCourse.push(
          //   <Col md={4}>
          //     <Thumbnail src="https://maxcdn.icons8.com/Share/icon/User_Interface//language1600.png" alt="242x200">
          //       <h3>{studentSubject.subject_name}</h3>
          //       <p>รหัสวิชา : {studentSubject.subject_id}</p>
          //       <p>กลุ่มเรียน : {studentSubject.group_id}</p>
          //       <p>เวลา: {scheduleStartTime} - {scheduleEndTime} น.</p>
          //       <p>
          //         <Button bsStyle="danger" block onClick={this.alertNoClass.bind(this)}>เข้าห้องเรียน</Button>
          //       </p>
          //     </Thumbnail>
          //   </Col>)
        }

      })

      scheduleStartTime = '';
      scheduleEndTime = '';


      this.setState({showCourse: '1'});

    })




  }

  intoClass(courseID,courseSection, sectionName , courseDate,courseName,courseStartTime,courseEndTime,semester,year){

    sessionStorage.setItem('courseID', courseID);
    sessionStorage.setItem('courseSection', courseSection);
    sessionStorage.setItem('sectionName', sectionName);
    sessionStorage.setItem('courseDate', courseDate);
    sessionStorage.setItem('courseName', courseName);
    sessionStorage.setItem('courseStartTime', courseStartTime);
    sessionStorage.setItem('courseEndTime', courseEndTime);
    sessionStorage.setItem('semester', semester);
    sessionStorage.setItem('year', year);
    sessionStorage.setItem('statusClass', 'class');
    window.open("/teacherassistant/1", "_self");
  }

  intoClassManage(courseID,courseSection, sectionName , courseDate,courseName,courseStartTime,courseEndTime,semester,year){

    sessionStorage.setItem('courseID', courseID);
    sessionStorage.setItem('courseSection', courseSection);
    sessionStorage.setItem('sectionName', sectionName);
    sessionStorage.setItem('courseDate', courseDate);
    sessionStorage.setItem('courseName', courseName);
    sessionStorage.setItem('courseStartTime', courseStartTime);
    sessionStorage.setItem('courseEndTime', courseEndTime);
    sessionStorage.setItem('semester', semester);
    sessionStorage.setItem('year', year);
    sessionStorage.setItem('statusClass', 'manage');

    window.open('/teacherassistant/1','class-manage','width=1200,height=1000');

    //window.open("/teacherassistant/1", "_self");
  }

  // intoMakeUpClass(courseID,courseDateNew){
  //
  //   sessionStorage.setItem('courseStatus', 'MAKEUP');
  //   sessionStorage.setItem('courseID', courseID);
  //   sessionStorage.setItem('courseDate', courseDateNew);
  //   window.open("/student", "_self");
  // }


  render() {

    // const d = new Date();
    // const mm = ("0" + (d.getMonth() + 1)).slice(-2)
    // const dd = ("0" + (d.getDate())).slice(-2);
    // const yyyy = d.getFullYear();
    // const today = yyyy + '-' + mm + '-' + dd ; //(US)
    // let time =  new Date().toLocaleTimeString('en-US',{ hour12: false });
    // let showcourse = [];
    // {this.props.courseTeacherAssistant.map((courseTeacherAssistant) =>
    //   {courseTeacherAssistant.courseID.map((courseDetail) => {
    //
    //
    //     if(courseDetail.skipStatus == 'NORMAL') {
    //
    //       var classStatus = false;
    //       var classCancel = false;
    //       var classMakeup = false;
    //       var courseDate = courseDetail.startDate;
    //       var courseDateNew = null;
    //       var start_time = null;
    //       var time_amount = null;
    //       var total_time = null;
    //       for (var i = 1; i <= courseDetail.totalAmount; i++) {
    //
    //         if (i >= 2) {
    //           var startDate = new Date(parseInt(courseDate.substring(0, 4), 10), parseInt(courseDate.substring(5, 7), 10) - 1, parseInt(courseDate.substring(8, 10), 10))
    //           startDate.setDate(parseInt(courseDate.substring(8, 10), 10) + 7)
    //           var dateSkip = new Date(startDate)
    //           var mm = ("0" + (dateSkip.getMonth() + 1)).slice(-2)
    //           var dd = ("0" + (dateSkip.getDate())).slice(-2)
    //           var yyyy = dateSkip.getFullYear();
    //           courseDate = yyyy + '-' + mm + '-' + dd; //(US)
    //
    //         }
    //
    //
    //
    //         {courseDetail.courseMakeup_id.map((courseMakeup) => {
    //
    //
    //
    //           if (courseMakeup.status == "CANCEL") {
    //
    //             if (courseDate == courseMakeup.operation_date && today == courseMakeup.operation_date) {
    //
    //               classCancel = true;
    //
    //             }
    //           }
    //
    //           else if (courseMakeup.status == "MAKEUP") {
    //
    //             courseDateNew = courseMakeup.operation_date;
    //             start_time = courseMakeup.operation_start;
    //             time_amount = courseMakeup.operation_time_amount;
    //             total_time =   parseInt(start_time.substring(0,2),10)+ time_amount ;
    //             if(total_time < 10){
    //               total_time = ("0"+total_time).slice(0,2)+':'+start_time.substring(3,5)+':'+start_time.substring(6,8);
    //             }
    //             else{
    //               total_time = total_time+':'+start_time.substring(3,5)+':'+start_time.substring(6,8);
    //             }
    //             classMakeup = true;
    //
    //           }
    //
    //
    //
    //         })}
    //         if (courseDate == today && time >= courseDetail.startTime && time <= courseDetail.endTime) {
    //           classStatus = true;
    //           break
    //         }
    //
    //       }
    //
    //     }
    //
    //     else if(courseDetail.skipStatus == 'SKIP'){
    //       var classStatus = false;
    //       var classCancel = false;
    //       var classMakeup = false;
    //       var courseDate = courseDetail.startDate;
    //       var courseDateNew = null;
    //       var start_time = null;
    //       var time_amount = null;
    //       var total_time = null;
    //       for(var i = 1 ; i<= courseDetail.totalAmount ; i++) {
    //
    //         if(i >= 2) {
    //           var startDate = new Date(parseInt(courseDate.substring(0, 4), 10), parseInt(courseDate.substring(5, 7), 10) - 1, parseInt(courseDate.substring(8, 10), 10))
    //           startDate.setDate(parseInt(courseDate.substring(8, 10), 10) + 14)
    //           var dateSkip = new Date(startDate)
    //           var mm = ("0" + (dateSkip.getMonth() + 1)).slice(-2)
    //           var dd = ("0" + (dateSkip.getDate())).slice(-2)
    //           var yyyy = dateSkip.getFullYear();
    //           courseDate = yyyy + '-' + mm + '-' + dd; //(US)
    //
    //         }
    //
    //         {courseDetail.courseMakeup_id.map((courseMakeup) => {
    //
    //
    //
    //           if (courseMakeup.status == "CANCEL") {
    //
    //
    //             if (courseDate  === courseMakeup.operation_date ) {
    //
    //
    //               classCancel = true;
    //
    //             }
    //           }
    //
    //           else if (courseMakeup.status == "MAKEUP") {
    //
    //             courseDateNew = courseMakeup.operation_date;
    //             start_time = courseMakeup.operation_start;
    //             time_amount = courseMakeup.operation_time_amount;
    //             total_time =   parseInt(start_time.substring(0,2),10)+ time_amount ;
    //             if(total_time < 10){
    //               total_time = ("0"+total_time).slice(0,2)+':'+start_time.substring(3,5)+':'+start_time.substring(6,8);
    //             }
    //             else{
    //               total_time = total_time+':'+start_time.substring(3,5)+':'+start_time.substring(6,8);
    //             }
    //
    //             console.log("webprotime:"+total_time)
    //
    //             classMakeup = true;
    //
    //           }
    //
    //
    //
    //         })}
    //
    //
    //         if(courseDate == today && time >= courseDetail.startTime && time <= courseDetail.endTime){
    //           classStatus = true;
    //           break
    //
    //         }
    //
    //
    //       }
    //
    //     }
    //
    //     if(classStatus == true && classCancel == false) {
    //
    //       showcourse.push(
    //         <Col md={4}>
    //           <Thumbnail src="https://maxcdn.icons8.com/Share/icon/User_Interface//language1600.png" alt="242x200">
    //             <h3>{courseDetail.name}</h3>
    //             <p>รหัสวิชา : {courseDetail.code}</p>
    //             <p>กลุ่มเรียน : {courseDetail.section}</p>
    //             <p>เวลา: {courseDetail.startTime.substring(0, 5)} - {courseDetail.endTime.substring(0, 5)} น.</p>
    //             <p>
    //               <Button bsStyle="success" block onClick={this.intoNormalClass.bind(this,courseDetail.ID,courseDate)} >เข้าห้องเรียน</Button>
    //             </p>
    //           </Thumbnail>
    //         </Col>
    //       )
    //     }
    //
    //     else if(classStatus == true && classCancel == true) {
    //
    //       showcourse.push(
    //         <Col md={4}>
    //           <Thumbnail src="https://maxcdn.icons8.com/Share/icon/User_Interface//language1600.png" alt="242x200">
    //             <h3>{courseDetail.name}</h3>
    //             <p>รหัสวิชา : {courseDetail.code}</p>
    //             <p>กลุ่มเรียน : {courseDetail.section}</p>
    //             <p>เวลา: {courseDetail.startTime.substring(0, 5)} - {courseDetail.endTime.substring(0, 5)} น.</p>
    //             <p>
    //               <Button bsStyle="danger" block onClick={this.alertNoClass.bind(this)}>เข้าห้องเรียน</Button>
    //             </p>
    //           </Thumbnail>
    //         </Col>
    //       )
    //     }
    //
    //     else if(classStatus == false && classMakeup == true && courseDateNew == today && time >= start_time && time <= total_time) {
    //
    //       showcourse.push(
    //         <Col md={4}>
    //           <Thumbnail src="https://maxcdn.icons8.com/Share/icon/User_Interface//language1600.png" alt="242x200">
    //             <h3>{courseDetail.name}</h3>
    //             <p>รหัสวิชา : {courseDetail.code}</p>
    //             <p>กลุ่มเรียน : {courseDetail.section}</p>
    //             <p>เวลา: {start_time.substring(0, 5)} - {total_time.substring(0, 5)} น.</p>
    //             <p>
    //               <Button bsStyle="success" block onClick={this.intoMakeUpClass.bind(this,courseDetail.ID,courseDateNew)} >เข้าห้องเรียน</Button>
    //             </p>
    //           </Thumbnail>
    //         </Col>
    //       )
    //     }
    //
    //     else if(classStatus == false ) {
    //
    //       showcourse.push(
    //         <Col md={4}>
    //           <Thumbnail src="https://maxcdn.icons8.com/Share/icon/User_Interface//language1600.png" alt="242x200">
    //             <h3>{courseDetail.name}</h3>
    //             <p>รหัสวิชา : {courseDetail.code}</p>
    //             <p>กลุ่มเรียน : {courseDetail.section}</p>
    //             <p>เวลา: {courseDetail.startTime.substring(0, 5)} - {courseDetail.endTime.substring(0, 5)} น.</p>
    //             <p>
    //               <Button bsStyle="danger" block onClick={this.alertNoClass.bind(this)}>เข้าห้องเรียน</Button>
    //             </p>
    //           </Thumbnail>
    //         </Col>
    //       )
    //     }
    //
    //
    //   })}
    // )}


    return (
      <Grid>
        <Row>
          <Col md={12}>
          <h1>เลือกวิชาสอน</h1>
          </Col>
        </Row>
        <Row>
          {teacherAssistantCourse}
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(TeacherAssistantCourse);
