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
import s from './Admin.css';
import {
  Alert,
  Col,
  Row,
  Grid,
  Button,
  Panel,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Tabs,
  Tab,
  ListGroup,
  ListGroupItem,
  Badge,
  Radio,
  Table,
  Thumbnail,
  Glyphicon,
  Modal,
  embed,

} from 'react-bootstrap';


let createStudentID = [];
let createStudentFirstName = [];
let createStudentLastName = [];
let updateStudentID = [];
let updateStudentFirstName = [];
let updateStudentLastName = [];

class Admin extends React.Component {
  static propTypes = {
    courseAll: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    studentAll: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    keyActive: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      updateData:'',
    };
  }

  handleChange(event) {
    // const key = event.keyCode;
    // if(key === 13){
    //   event.preventDefault()
    // }
    this.setState({value: event.target.value});
  }

  codeChange(event) {
    this.setState({code: event.target.value});
  }

  nameChange(event) {
    this.setState({name: event.target.value});
  }

  sectionChange(event) {
    this.setState({section: event.target.value});
  }

  courseChange(event) {
    this.setState({course: event.target.value});
  }


  timeChange(event) {
    this.setState({time: event.target.value});
  }

  statusChange(event) {
    this.setState({status: event.target.value});
  }

  totalAmountChange(event) {
    this.setState({totalAmount: event.target.value});
  }

  startDateChange(event) {
    this.setState({startDate: event.target.value});
  }

  dateChange(event) {
    this.setState({date: event.target.value});
  }

  timeChange(event) {
    this.setState({time: event.target.value});
  }

  timeCourseChange(event) {
    this.setState({timeCourse: event.target.value});
  }




  saveCourseCancel = event =>{

    // const rawDate = ''+this.state.startDate;
    // const date = rawDate.substring(3,5);
    // const month = rawDate.substring(0,2);
    // const year = rawDate.substring(6,10);
    // const finishDate = year+'-'+month+'-'+date;
    // const rawStartTime = ''+this.state.time;
    // const rawEndTime = ''+this.state.time;
    // const startTime = rawStartTime.substring(0,5)+':00';
    // const endTime = rawEndTime.substring(8,13)+':00';

    const time = this.state.time+':00';
    const day = this.state.date.substring(0,2);
    const month = this.state.date.substring(3,5);
    const year = this.state.date.substring(6,10);
    const newDate = year+'-'+month+'-'+day;

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{cancelClass(course_id:' + this.state.course + ',operation_date:"' + newDate + '",status:"CANCEL"){ id } }',
      })
    }).then(window.location.reload())
  }

  saveCourseMakeUp = event =>{

    const time = this.state.time+':00';
    const day = this.state.date.substring(0,2);
    const month = this.state.date.substring(3,5);
    const year = this.state.date.substring(6,10);
    const newDate = year+'-'+month+'-'+day;


    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{makeUpClass(course_id:' + this.state.course + ',operation_date:"' + newDate + '"' +
        ',status:"MAKEUP",operation_start:"'+time+'",operation_time_amount:'+this.state.timeCourse+'){ id } }',
      })
    }).then(window.location.reload())
  }

  convertDate(dateParams){
    const day = ""+dateParams.substring(8,10);
    const month = ""+dateParams.substring(5,7);
    const year = ""+dateParams.substring(0,4);
    const courseDateNewStart = day+'-'+month+'-'+year;
    return courseDateNewStart;
  }

  deleteCourseMakeUpCancel(id){
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{deleteCourseMakeUpCancel(id:'+id+'){ id } }',
      })
    }).then(window.location.reload())

  }

  componentDidMount(){
    // const isAdmin = sessionStorage.getItem('isAdmin')
    // if(isAdmin !== 'true'){
    //   alert("ผิดพลาด! กรุณาเข้าสู่ระบบ");
    //   window.location.replace("/");
    // }


  }




  async deleteCourse(){

    let statusDelete = null;
    let courseCode = null;
    let courseSection = null;
    this.setState({update: true});
    const resp = await fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/getSubjectSchedule', {
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        apiKey : "afab7e2f35fe11c45116e2315e7387b6",
        sReturn : "1"
      }),
    })
    const  data  = await resp.json();
    const  subject = await data.data
     this.props.courseAll.map((course) => {
        statusDelete = 0;
        subject.map(async(subject,indexSubject) => {
          if(subject.aSchedule.length !== 0){
            subject.aSchedule[0].aTime.map((aTime) => {
              // console.log(course.section+' : '+aTime.group_id)
              if(course.code === subject.subjectID && course.section === aTime.group_id){
                statusDelete = 1;
              }
            })
          }
          else{
            if(course.code === subject.subjectID){
              statusDelete = 1;

            }
          }
        })
        // console.log(course.code+'section: '+course.section+' : '+statusDelete)
        if(statusDelete === 0){

          fetch('/graphql', {

            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: 'mutation{ deleteCourse(ID:' + course.ID + ') { ID}}',
            }),
          });

        }
      })




}

  tabChange(key){
    window.history.pushState( {} , '', './'+key );
  }

  async updateCourse(){
    const TSSresp = await fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/getSubjectSchedule', {
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        apiKey : "afab7e2f35fe11c45116e2315e7387b6",
        sReturn : "1"
      }),
    })
    const  TSSdata  = await TSSresp.json();
    const  TSSsubject = await TSSdata.data

    const QLresp = await fetch('/graphql', {

      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ courseAll { ID code name section }}',
      }),
    });
    const  QLdata  = await QLresp.json();
    const  QLsubject =  QLdata.data.courseAll;
    let courseAlready = null;
    let record = 0;
    let realRecord = 0;

    TSSsubject.map((subject) => {


      if(subject.aSchedule.length !== 0){

        subject.aSchedule[0].aTime.map((aTime) => {


          courseAlready = 0;

          QLsubject.map((course) => {

            if(course.code === subject.subjectID && course.section === aTime.group_id){
              courseAlready = 1;
            }

          })

          if(courseAlready === 0){
            fetch('/graphql', {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: 'mutation{ courseCreate(code : "'+subject.subjectID+'",name:"'+subject.subjectName+'",section:'+aTime.group_id+',group_name:"'+aTime.group_name+'") { ID}}',
              }),
            });
          }
          else{
            fetch('/graphql', {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: 'mutation{ courseUpdate(code : "'+subject.subjectID+'",name:"'+subject.subjectName+'",section:'+aTime.group_id+',group_name:"'+aTime.group_name+'") { ID}}',
              }),
            });
          }
        })

      }
      else{

        courseAlready = 0;

        QLsubject.map((course) => {
          if(course.code === subject.subjectID){
            courseAlready = 1;
          }
        })

        if(courseAlready === 0){
        fetch('/graphql', {

            method: 'post',
            body: JSON.stringify({
              query: 'mutation{ courseCreate(code : "'+subject.subjectID+'",name:"'+subject.subjectName+'",section:'+null+',group_name:'+null+') { ID}}',
            }),
          });
        }
        else{
          fetch('/graphql', {
            method: 'post',
            body: JSON.stringify({
              query: 'mutation{ courseUpdate(code : "'+subject.subjectID+'",name:"'+subject.subjectName+'",section:'+null+',group_name:'+null+') { ID}}',
            }),
          });
        }

      }



      // if(subject.aSchedule[0].aTime !== 0){
      //   subject.aSchedule[0].aTime.map((aTime) => {
      //     console.log(subject.subjectName);
      //     console.log(aTime.group_id);
      //   })
      // }


    })



 }



refreshWindow(){
  setTimeout(() => {  this.setState({update: false}); }, 40000);
  setTimeout(() => {  window.location.reload(); }, 41000);
}


 async updateData(event){
   const isAdmin = sessionStorage.getItem('isAdmin');
   if(isAdmin === 'true') {
     const deleteCourse = await this.deleteCourse();
     const updateCourse = await this.updateCourse(deleteCourse);
    this.refreshWindow(updateCourse);
   }
    event.preventDefault()


 }

 surveyPage(){

 }

  async test(){
    const dataTeacherAll = await this.updateCourse();
    dataTeacherAll.map((dataTeacher) => {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'mutation{teacherCreate(code:"'+dataTeacher.teacherID+'",position:"'+dataTeacher.teacherPosition+'",firstName:"'+dataTeacher.teacherName+'",' +
          'lastName:"'+dataTeacher.teacherLastname+'",username:"'+dataTeacher.teacherUsername+'",password:"'+dataTeacher.teacherPassword+'"){ ID } }',
        })
      })
    })
  }

  render() {


    let initialClassCancel = [];
    let initialClassMakeUp = [];






    const d = new Date();
    const mm = ("0" + (d.getMonth() + 1)).slice(-2);
    const dd = ("0" + (d.getDate())).slice(-2);
    const yyyy = d.getFullYear();
    const today = yyyy + '-' + mm + '-' + dd ; //(US)
    let time =  new Date().toLocaleTimeString('en-US',{ hour12: false });
    let showcourse = [];
    let course = [];
    let courseDateNew = null;
    let day = null;
    let month = null;
    let year = null;
    let courseDateNewStart = null;
    let isCourseCancel = null;
    // let courseCancel = [];
    // let courseMakeUp = [];
    // let courseCancelData = [];
    // let courseMakeUpData = [];
    //  let numCancel = null;
    //  let numMakeUp = null;

    //
    // this.props.courseAll.map((courseAll, index) => {
    //
    //
    //
    //   courseAll.courseMakeup_id.map((courseMakeUp) => {
    //
    //     if(courseMakeUp.status === "CANCEL"){
    //       numCancel++;
    //       day = ""+courseMakeUp.operation_date.substring(8,10);
    //       month = ""+courseMakeUp.operation_date.substring(5,7);
    //       year = ""+courseMakeUp.operation_date.substring(0,4);
    //       courseDateNewStart = day+'-'+month+'-'+year;
    //       courseCancelData.push(courseDateNewStart);
    //
    //     }
    //     else if(courseMakeUp.status === "MAKEUP"){
    //       numMakeUp++;
    //       day = ""+courseMakeUp.operation_date.substring(8,10);
    //       month = ""+courseMakeUp.operation_date.substring(5,7);
    //       year = ""+courseMakeUp.operation_date.substring(0,4);
    //       courseDateNewStart = day+'-'+month+'-'+year;
    //       courseMakeUpData.push(courseDateNewStart);
    //
    //     }
    //     })
    // })



    return (

      <Grid >
        <Modal
          show={this.state.update}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Body>
            <h5 >กรุณารอสักครู่.... กำลังอัพเดทข้อมูล</h5>
          </Modal.Body>
        </Modal>
        <Col md={12}>
          <h1><Glyphicon glyph="user" />&nbsp;ผู้ดูแลระบบ</h1>
        </Col>

        <Row>
          <Col md={3}>
            {/*<Panel header="จัดการคลาส" bsStyle="info">*/}
              {/*<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">*/}
                {/*<Tab eventKey={1} title="ยกเลิกคลาส">*/}
              {/*<Form onSubmit={this.saveCourseCancel}>*/}
                {/*<Col md={12}>*/}
                  {/*<br/>*/}
                  {/*<ControlLabel>วิชา</ControlLabel>*/}
                {/*</Col>*/}
                {/*<Col md={12}>*/}
                  {/*<FormControl componentClass="select" value={this.state.course} onChange={this.courseChange.bind(this)} required >*/}
                    {/*<option value={null}>เลือกวิชา*</option>*/}
                    {/*{this.props.courseAll.map((courseAll) =>*/}
                    {/*<option value={courseAll.ID}>{courseAll.code} {courseAll.name}</option>*/}
                      {/*)}*/}
                  {/*</FormControl>*/}
                {/*</Col>*/}
                {/*<Col md={12}>*/}
                  {/*<br/>*/}
                  {/*<ControlLabel>วันที่ยกเลิก (Ex. 01-03-2560)</ControlLabel>*/}
                {/*</Col>*/}
                {/*<Col md={12}>*/}
                  {/*<FormControl value={this.state.date} onChange={this.dateChange.bind(this)} type="text" pattern="\d{1,2}-\d{1,2}-\d{4}" required/>*/}
                {/*</Col>*/}
                {/*<Col md={12}>*/}
                  {/*<br/>*/}
                  {/*<Button bsStyle="success" block type="submit">ยืนยัน</Button>*/}
                {/*</Col>*/}
              {/*</Form>*/}
                {/*</Tab>*/}
                {/*<Tab eventKey={2} title="ชดเชยคลาส">*/}
                  {/*<Form onSubmit={this.saveCourseMakeUp}>*/}
                    {/*<Col md={12}>*/}
                      {/*<br/>*/}
                      {/*<ControlLabel>วิชา</ControlLabel>*/}
                    {/*</Col>*/}
                    {/*<Col md={12}>*/}
                      {/*<FormControl componentClass="select" value={this.state.course} onChange={this.courseChange.bind(this)} required>*/}
                        {/*<option>เลือกวิชา*</option>*/}
                        {/*{this.props.courseAll.map((courseAll) =>*/}
                          {/*<option value={courseAll.ID}>{courseAll.name}</option>*/}
                        {/*)}*/}
                      {/*</FormControl>*/}
                    {/*</Col>*/}
                    {/*<Col md={12}>*/}
                      {/*<br/>*/}
                      {/*<ControlLabel>วันที่ชดเชย (Ex. 01-03-2560)</ControlLabel>*/}
                    {/*</Col>*/}
                    {/*<Col md={12}>*/}
                      {/*<FormControl value={this.state.date} onChange={this.dateChange.bind(this)} type="text" pattern="\d{1,2}-\d{1,2}-\d{4}" required/>*/}
                    {/*</Col>*/}
                    {/*<Col md={12}>*/}
                      {/*<br/>*/}
                      {/*<ControlLabel>เวลาเรียน (Ex. 09:30)</ControlLabel>*/}
                    {/*</Col>*/}
                    {/*<Col md={12}>*/}
                      {/*<FormControl value={this.state.time} onChange={this.timeChange.bind(this)} type="text" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" required/>*/}
                    {/*</Col>*/}
                    {/*<Col md={12}>*/}
                      {/*<br/>*/}
                      {/*<ControlLabel>จำนวนชั่วโมงเรียน (ชั่วโมง)</ControlLabel>*/}
                    {/*</Col>*/}
                    {/*<Col md={4}>*/}
                      {/*<FormControl value={this.state.timeCourse} onChange={this.timeCourseChange.bind(this)} type="number" min='1' required/>*/}
                    {/*</Col>*/}
                    {/*<Col md={12}>*/}
                      {/*<br/>*/}
                      {/*<Button bsStyle="success" block type="submit">ยืนยัน</Button>*/}
                    {/*</Col>*/}
                  {/*</Form>*/}
                {/*</Tab>*/}
              {/*</Tabs>*/}
            {/*</Panel>*/}
            <Panel bsStyle="warning">
              <Col md={12}>
            <Button bsStyle="warning" block onClick={this.updateData.bind(this)}>อัพเดทข้อมูล</Button>
              </Col>
            </Panel>


          {/*</Col>*/}
          {/*<Col md={8}>*/}
            {/*<Panel >*/}
              {/*<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">*/}
                {/*<Tab eventKey={1} title="คาบเรียนปกติ">*/}
                  {/*<br/>*/}
                  {/*{this.props.courseAll.map((courseAll, index) =>*/}
                  {/*<Panel collapsible header={courseAll.name+' ('+courseAll.code+')'} style={{'cursor': 'pointer'}}>*/}
                    {/*<ListGroup >*/}
                      {/*<Col md={12}>*/}
                        {/*<Table >*/}
                          {/*<thead>*/}
                          {/*<tr>*/}
                            {/*<th className="text-center">ครั้งที่</th>*/}
                            {/*<th className="text-center">วันที่</th>*/}
                            {/*<th>เริ่มคาบเรียน</th>*/}
                            {/*<th>เวลาสิ้นสุด</th>*/}
                          {/*</tr>*/}
                          {/*</thead>*/}
                          {/*{course[index]}*/}
                        {/*</Table>*/}
                      {/*</Col>*/}
                    {/*</ListGroup>*/}
                  {/*</Panel>*/}
                  {/*)}*/}
                {/*</Tab>*/}
                {/*<Tab eventKey={2} title="ยกเลิกคาบเรียน">*/}
                  {/*<br/>*/}
                  {/*{this.props.courseAll.map((courseAll, index) =>*/}
                    {/*<Panel collapsible header={courseAll.name+' ('+courseAll.code+')'} style={{'cursor': 'pointer'}}>*/}
                      {/*<ListGroup >*/}
                        {/*<Col md={12}>*/}
                          {/*<Table >*/}
                            {/*<thead>*/}
                            {/*<tr>*/}
                              {/*<th className="text-center">ลำดับ</th>*/}
                              {/*<th className="text-center">วันที่</th>*/}
                              {/*<th className="text-center">ลบ</th>*/}
                            {/*</tr>*/}
                            {/*</thead>*/}
                            {/*{initialClassCancel[index]}*/}
                            {/*{courseAll.courseMakeup_id.map((courseMakeUp, indexCourseMakeUp) =>*/}

                                {/*courseMakeUp.status === "CANCEL" &&*/}
                                {/*<tbody>*/}
                                {/*<tr>*/}
                                  {/*<td className="text-center">{indexCourseMakeUp + 1}</td>*/}
                                  {/*<td className="text-center">{this.convertDate(courseMakeUp.operation_date)}</td>*/}
                                  {/*<td ><Col md={4} mdOffset={4}><Button bsStyle="danger" block bsSize="xsmall" onClick={this.deleteCourseMakeUpCancel.bind(this, courseMakeUp.id)}><Glyphicon glyph="remove"/></Button></Col></td>*/}
                                {/*</tr>*/}
                                {/*</tbody>*/}

                            {/*)}*/}
                          {/*</Table>*/}
                        {/*</Col>*/}
                      {/*</ListGroup>*/}
                    {/*</Panel>*/}
                  {/*)}*/}
                {/*</Tab>*/}
                {/*<Tab eventKey={3} title="ชดเชยคาบเรียน">*/}
                  {/*<br/>*/}
                  {/*{this.props.courseAll.map((courseAll, index) =>*/}
                    {/*<Panel collapsible header={courseAll.name+' ('+courseAll.code+')'} style={{'cursor': 'pointer'}}>*/}
                      {/*<ListGroup >*/}
                        {/*<Col md={12}>*/}
                          {/*<Table >*/}
                            {/*<thead>*/}
                            {/*<tr>*/}
                              {/*<th className="text-center">ลำดับ</th>*/}
                              {/*<th className="text-center">วันที่</th>*/}
                              {/*<th className="text-center">เริ่มคาบเรียน</th>*/}
                              {/*<th className="text-center">ชั่วโมงเรียน</th>*/}
                              {/*<th  className="text-center">ลบ</th>*/}
                            {/*</tr>*/}
                            {/*</thead>*/}
                            {/*{initialClassMakeUp[index]}*/}
                            {/*{courseAll.courseMakeup_id.map((courseMakeUp, indexCourseMakeUp) =>*/}
                                {/*courseMakeUp.status === "MAKEUP" &&*/}
                                {/*<tbody>*/}
                                {/*<tr>*/}
                                  {/*<td className="text-center">{indexCourseMakeUp + 1}</td>*/}
                                  {/*<td className="text-center">{this.convertDate(courseMakeUp.operation_date)}</td>*/}
                                  {/*<td className="text-center">{courseMakeUp.operation_start}</td>*/}
                                  {/*<td className="text-center">{courseMakeUp.operation_time_amount} (ชั่วโมง)</td>*/}
                                  {/*<td><Col md={8} mdOffset={2}><Button bsStyle="danger" block bsSize="xsmall" onClick={this.deleteCourseMakeUpCancel.bind(this, courseMakeUp.id)}><Glyphicon*/}
                                    {/*glyph="remove"/></Button></Col></td>*/}
                                {/*</tr>*/}
                                {/*</tbody>*/}

                            {/*)}*/}
                          {/*</Table>*/}
                        {/*</Col>*/}
                      {/*</ListGroup>*/}
                    {/*</Panel>*/}
                  {/*)}*/}
                {/*</Tab>*/}
              {/*</Tabs>*/}
            {/*</Panel>*/}
          </Col>

          <Col md={9}>

            <Panel>

              <Tabs defaultActiveKey={parseInt(this.props.keyActive)} id="uncontrolled-tab-example" onSelect={this.tabChange}>
                <Tab eventKey={1} title="จัดการแบบประเมิน">

                  <iframe frameBorder="0" src={'http://58.181.171.138/php/survey/survey.php?search=false'} style={{width:'100%',height:'600'}}></iframe>

                </Tab>
                <Tab eventKey={2} title="สรุปผลแบบประเมิน">

                  <iframe frameBorder="0" src={'http://58.181.171.138/php/summary-survey/index.php'} style={{width:'100%',height:'600'}}></iframe>

                </Tab>
                <Tab eventKey={3} title="รายงานการวัดผลนักศึกษา">

                  <iframe frameBorder="0" src={'http://58.181.171.138/php/report/course-list.php'} style={{width:'100%',height:'600'}}></iframe>

                </Tab>

                <Tab eventKey={4} title="โพสเฟสบุ๊ค">

                  <iframe frameBorder="0" src={'http://58.181.171.138/php/facebook/page-post.php'} style={{width:'100%',height:'600'}}></iframe>

                </Tab>

              </Tabs>
            </Panel>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(Admin);
