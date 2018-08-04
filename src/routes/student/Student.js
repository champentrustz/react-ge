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
import s from './Student.css';
import {
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
  ResponsiveEmbed,
  Glyphicon,
  Table,
  embed
} from 'react-bootstrap';

let exerciseShow = [];


class Student extends React.Component {

  static propTypes = {
    question: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,


    course: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,



    individualStudentScore: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,

    exercise: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,

    questionStudent: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,

    questionOtherStudent: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,

    course_ID: PropTypes.string,
    keyActive: PropTypes.string,
    semester: PropTypes.string,
    checkStudentCheckin: PropTypes.string,
    year: PropTypes.string,
    studentGender: PropTypes.string,
    title: PropTypes.string.isRequired,
    course_DATE: PropTypes.string,
    course_STATUS: PropTypes.string,
    student_ID: PropTypes.string,
    courseStartTime: PropTypes.string,
    courseEndTime: PropTypes.string,
    courseName: PropTypes.string,
    courseID: PropTypes.string,
    courseSection: PropTypes.string,
    studentID: PropTypes.string,
    courseDate: PropTypes.string,
    studentFirstName: PropTypes.string,
    studentLastName: PropTypes.string,
  };


  constructor(props) {
    super(props);
    this.state = {
      value: '',
      key:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.codeChange = this.codeChange.bind(this);
    this.codeLogoutChange = this.codeLogoutChange.bind(this);
    // const timeLogin =   new Date().toLocaleTimeString('en-US',{ hour12: false });
    // const d = new Date();
    // const mm = ("0" + (d.getMonth() + 1)).slice(-2)
    // const dd = d.getDate();
    // const yyyy = d.getFullYear();
    // const myDateString = yyyy + '-' + mm + '-' + dd ; //(US)

  }

  handleChange(event) {
    const key = event.keyCode;
    if(key === 13){
      event.preventDefault()
    }
    this.setState({value: event.target.value});
  }

  codeChange(event) {
    this.setState({code: event.target.value});
  }

  codeLogoutChange(event) {
    this.setState({codeLogout: event.target.value});
  }

  voteSubmit(questionID){
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{voteQuestion(ID:'+questionID+'){ ID } }',
      })
    }).then((response) => response.json())
      .then(() => {
        window.open("./3", "_self");
      })
  }

handleSubmit = event => {


    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{questionCreate(courseID:"'+ this.props.courseID +'",section:"'+this.props.courseSection+'",studentID:"'+this.props.studentID+'",question:"'+this.state.value+'",date:"'+this.props.courseDate+'"){ID}}',
      })
    }).then((response) => response.json())
      .then(() => {
        window.open("./3", "_self");
      })



    event.preventDefault();
  };

   checkLogoutCode = event => {
     const d = new Date();
     const mm = ("0" + (d.getMonth() + 1)).slice(-2);
     const dd = ("0" + (d.getDate())).slice(-2);
     const yyyy = d.getFullYear();
     const myDateString = yyyy + '-' + mm + '-' + dd ; //(US)
     const timeLogin =  new Date().toLocaleTimeString('en-US',{ hour12: false });
     const finishDateTime = myDateString + ' ' + timeLogin;

     fetch('/graphql', {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    query: 'query{course(code:"'+this.props.courseID+'",section:"'+this.props.courseSection+'"){code,section,name,checkinCode,checkoutCode}}',
                  }),
                }).then((response) => response.json())
       .then((responseJson) => {
         const {data} = responseJson;
         const courseDetail = data.course;
         courseDetail.map((course) => {
           if (course.checkoutCode == this.state.codeLogout) {
             fetch('/graphql', {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                 query: 'mutation{checkoutStudent(courseID:"' + this.props.courseID + '",section:"'+this.props.courseSection+'",studentID:"'+this.props.studentID+'",checkoutDate:"' + finishDateTime + '",checkinDate:"'+this.props.courseDate+'"){ID}}',
               })
             }).then((response) => response.json())
               .then(() => {
                 window.location.replace("/student-course");
               })
           }
           else{
             this.setState({codeLogout: ''});
             alert("รหัสออกห้องเรียนไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง");
           }
         })
       })




    event.preventDefault();
  }




  async checkCode(event){

     event.preventDefault();

    const d = new Date();
    const mm = ("0" + (d.getMonth() + 1)).slice(-2);
    const dd = ("0" + (d.getDate())).slice(-2);
    const yyyy = d.getFullYear();
    const myDateString = yyyy + '-' + mm + '-' + dd ; //(US)
    const timeLogin =  new Date().toLocaleTimeString('en-US',{ hour12: false });
    const finishDateTime = myDateString + ' ' + timeLogin;

    const respCheck = await fetch('http://58.181.171.138/php/api/checkDuplicateCheckin.php', {

      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        student_id : this.props.studentID,
        course_id : this.props.courseID,
        course_section : this.props.courseSection,
        course_start : this.props.courseStartTime,
        course_end : this.props.courseEndTime,
        course_date : this.props.course_DATE,

      }),
    });
    const dataCheck = await respCheck.json();



      const dataCourse = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'query{course(code:"'+this.props.courseID+'",section:"'+this.props.courseSection+'"){ID,code,section,name,checkinCode,startTime,endTime}}',
        }),
      })
          const {data} = await dataCourse.json();
          const courseDetail = data.course;



            const timestart_min = parseInt(this.props.courseStartTime.substring(3, 5), 10);
            const timelogin_min = parseInt(timeLogin.substring(3, 5), 10);
            const timestart_hours = parseInt(this.props.courseStartTime.substring(0, 2), 10);
            const timelogin_hours = parseInt(timeLogin.substring(0, 2), 10);
            const logintime_min = timelogin_min - timestart_min;
            const logintime_hours = timelogin_hours - timestart_hours;

            const logintime_all = logintime_min + (logintime_hours * 60)



              if(courseDetail[0].checkinCode === this.state.code) {

              if(dataCheck.duplicate === 'false') {

                  if (logintime_all <= 30) {


                    fetch('/graphql', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        query: 'mutation{checkinStudentCreate(courseID:"' + this.props.courseID + '",section:"' + this.props.courseSection + '",studentID:"' + this.props.studentID + '",firstName:"' + this.props.studentFirstName + '",lastName:"' + this.props.studentLastName + '",status:"NORMAL",checkinDate:"' + finishDateTime + '"){ID,status}}',
                      })
                    }).then(() => {

                      window.location.reload();
                    })
                  }

                  else if (logintime_all > 30  && logintime_all <= 60) {

                    fetch('/graphql', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        query: 'mutation{checkinStudentCreate(courseID:"' + this.props.courseID + '",section:"' + this.props.courseSection + '",studentID:"' + this.props.studentID + '",firstName:"' + this.props.studentFirstName + '",lastName:"' + this.props.studentLastName + '",status:"LATE",checkinDate:"' + finishDateTime + '"){ID,status}}',
                      })
                    }).then(() => {

                      window.location.reload();
                    })
                  }

                else if (logintime_all > 60) {

                  fetch('/graphql', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      query: 'mutation{checkinStudentCreate(courseID:"' + this.props.courseID + '",section:"' + this.props.courseSection + '",studentID:"' + this.props.studentID + '",firstName:"' + this.props.studentFirstName + '",lastName:"' + this.props.studentLastName + '",status:"ABSENT",checkinDate:"' + finishDateTime + '"){ID,status}}',
                    })
                  }).then(() => {
                    window.location.reload();
                  })
                }

                else {

                  fetch('/graphql', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      query: 'mutation{checkinStudentCreate(courseID:"' + this.props.courseID + '",section:"' + this.props.courseSection + '",studentID:"' + this.props.studentID + '",firstName:"' + this.props.studentFirstName + '",lastName:"' + this.props.studentLastName + '",status:"ABSENT",checkinDate:"' + finishDateTime + '"){ID,status}}',
                    })
                  }).then(() => {

                    window.location.reload();
                  })
                }
              }
              else{

                alert("ผิดพลาด! ท่านได้เข้าชั้นเรียนแแล้ว");
                this.setState({checkinCode: ''});
              }

              }
              else {

                alert("รหัสเข้าห้องเรียนไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง");
                this.setState({checkinCode: ''});
              }




  };

  popUp(exercise_ID,indexExercise) {
    const win = window.open('http://58.181.171.138/php/student-exercise/student-exercise-session.php?exercise_id=' + exercise_ID + '&student_id=' + this.props.student_ID, 'student-exercise', 'width=1200,height=1000');
    var timer = setInterval(function() {
      if(win.closed) {
        clearInterval(timer);
       window.location.reload();
      }
    }, 500);
  }

  componentDidMount(){
  }

  tabChange(key){
    window.history.pushState( {} , '', './'+key );
  }



render() {





  let initialQuestion = [];
  let initialExercise = [];
  let checkStudent = null;
  let checkout = null;

  let statusCheckExercise = null;



  initialQuestion.push( <ListGroupItem>
    <h5 className="text-danger">ไม่พบรายการคำถาม</h5>
  </ListGroupItem>);

  initialExercise.push( <Col md={12}><ListGroupItem>
    <h5 className="text-danger">ไม่พบแบบทดสอบ</h5>
  </ListGroupItem></Col>);

  this.props.exercise.map((exercise,indexExercise) =>{
    initialExercise = [];
    exerciseShow.push([]);
  })

  this.props.exercise.map((exercise,indexExercise) =>{

    statusCheckExercise = 0;

    this.props.individualStudentScore.map((individualStudentScore) => {


      if(individualStudentScore.exercise_id === exercise.id ) {

        statusCheckExercise = 1;

          exerciseShow[indexExercise] = <tr>
            <td className="text-center">{indexExercise + 1}</td>
            <td className="text-center">{exercise.name}</td>
            <td className="text-center"><Button bsStyle="success" className="disabled"><span
              className="glyphicon glyphicon-edit"/></Button></td>
          </tr>

      }

    })

    if(statusCheckExercise === 0) {
      exerciseShow[indexExercise] = <tr>
        <td className="text-center">{indexExercise + 1}</td>
        <td className="text-center">{exercise.name}</td>
        <td className="text-center"><Button bsStyle="success"
                                            onClick={this.popUp.bind(this, exercise.id,indexExercise)}><span
          className="glyphicon glyphicon-edit"/></Button></td>
      </tr>
    }




  })


    this.props.question.map((question) => {

    initialQuestion = [];

  })

    let statusCheck = null;


      this.props.checkStatus.map((check) => {



        statusCheck = 0;


        var timeCheckIn = check.checkinDate.substring(11, 20);
        var timeCheckOut = "";
        if(check.checkoutDate !== null){
           timeCheckOut = check.checkoutDate.substring(11, 20);
        }
        var courseStartTime = this.props.courseStartTime;
        var courseEndTime = this.props.courseEndTime;


        if(timeCheckIn >= courseStartTime && timeCheckIn <= courseEndTime){


          statusCheck = 1;

        }

        if(statusCheck === 1){

          if (check.status === "NORMAL" ) {
            checkStudent = <Panel header="สถานะการยืนยันตัว" bsStyle="success">
              <h3 className="text-success">
                <center>สถานะ : มาตรงเวลา</center>
              </h3>
            </Panel>
            if(timeCheckOut === ""){
              checkout = <Panel header="ออกจากห้องเรียน" bsStyle="danger">
                <Form onSubmit={this.checkLogoutCode.bind(this)}>
                  <FormGroup>
                    <FormControl type="text" placeholder="รหัสออกห้องเรียน" value={this.state.codeLogout}
                                 onChange={this.codeLogoutChange}/>
                  </FormGroup>
                  <div className="text-center">
                    <Button bsStyle="danger" block type="submit">ออกห้องเรียน</Button>
                  </div>
                </Form>
              </Panel>
            }
            else{
              checkout = <Panel bsStyle="danger">
                <h3 className="text-center  text-danger">ออกจากระบบแล้ว</h3>
              </Panel>
            }
          }
          if (check.status === "LATE" ) {
            checkStudent = <Panel header="สถานะการยืนยันตัว" bsStyle="warning">
              <h3 className="text-warning">
                <center>สถานะ : มาสาย</center>
              </h3>
            </Panel>
            if(timeCheckOut === ""){
              checkout = <Panel header="ออกจากห้องเรียน" bsStyle="danger">
                <Form  onSubmit={this.checkLogoutCode.bind(this)}>
                  <FormGroup>
                    <FormControl type="text" placeholder="รหัสออกห้องเรียน" value={this.state.codeLogout}
                                 onChange={this.codeLogoutChange}/>
                  </FormGroup>
                  <div className="text-center">
                    <Button bsStyle="danger" block type="submit">ออกห้องเรียน</Button>
                  </div>
                </Form>
              </Panel>
            }
            else{
              checkout = <Panel bsStyle="danger">
                <h3 className="text-center  text-danger">ออกจากระบบแล้ว</h3>
              </Panel>
            }
          }
          if (check.status === "ABSENT" ) {
            checkStudent = <Panel header="สถานะการยืนยันตัว" bsStyle="danger">
              <h3 className="text-danger">
                <center>สถานะ : ขาดเรียน</center>
              </h3>
            </Panel>
            if(timeCheckOut === ""){
              checkout = <Panel header="ออกจากห้องเรียน" bsStyle="danger">
                <Form  onSubmit={this.checkLogoutCode.bind(this)}>
                  <FormGroup>
                    <FormControl type="text" placeholder="รหัสออกห้องเรียน" value={this.state.codeLogout}
                                 onChange={this.codeLogoutChange}/>
                  </FormGroup>
                  <div className="text-center">
                    <Button bsStyle="danger" block type="submit">ออกห้องเรียน</Button>
                  </div>
                </Form>
              </Panel>
            }
            else{
              checkout = <Panel bsStyle="danger">
                <h3 className="text-center  text-danger">ออกจากระบบแล้ว</h3>
              </Panel>
            }
          }
        }

      })

 if(statusCheck === 0) {

    checkStudent = <Panel header="เข้าห้องเรียน" bsStyle="info">
      <Form onSubmit={this.checkCode.bind(this)}>
        <FormGroup>
          <FormControl type="text" placeholder="รหัสเข้าห้องเรียน" value={this.state.code}
                       onChange={this.codeChange}/>
        </FormGroup>
        <div className="text-center">
          <Button bsStyle="success" block type="submit">เข้าห้องเรียน</Button>
        </div>
      </Form>
    </Panel>
  }
    if (this.props.checkStatus.length === 0) {
      checkStudent = <Panel header="เข้าห้องเรียน" bsStyle="info">
        <Form onSubmit={this.checkCode.bind(this)}>
          <FormGroup>
            <FormControl type="text" placeholder="รหัสเข้าห้องเรียน" value={this.state.code}
                         onChange={this.codeChange}/>
          </FormGroup>
          <div className="text-center">
            <Button bsStyle="success" block type="submit">เข้าห้องเรียน</Button>
          </div>
        </Form>
      </Panel>
    }

    return (
      <Grid>
        <Row>
            <Col md={12}>
          <h1>
            <span className="glyphicon glyphicon-blackboard" />&nbsp;{this.props.courseName} ({this.props.courseID})<span> <iframe frameBorder="0" src={'http://58.181.171.138/php/facebook/share.php'} style={{height:'20px'}}></iframe></span>
          </h1>

            </Col>
        </Row>
        <Row>
          <Col md={4}>
            {checkStudent}
            {checkout}
          </Col>
          <Col md={8}>
            <Panel >
              <Tabs defaultActiveKey={parseInt(this.props.keyActive)} id="uncontrolled-tab-example" onSelect={this.tabChange}>
                <Tab eventKey={1} title="ดาวน์โหลดไฟล์" >

                  <iframe frameBorder="0" src={'http://58.181.171.138/php/upload/course-file.php?course_id='+this.props.course_ID+'&course_section='+this.props.courseSection} style={{width:'100%',height:'300'}}></iframe>

                </Tab>
                <Tab eventKey={2} title="แบบทดสอบ">
                  <Row>
                    <Col md={12}>
                    <ListGroup>

                      <br/>


                      <Table>
                        <thead>
                        <tr>
                          <th className="text-center">ลำดับ</th>
                          <th className="text-center">ชื่อแบบทดสอบ</th>
                          <th className="text-center">ทำแบบทดสอบ</th>
                        </tr>
                        </thead>
                      <tbody>

                      {this.props.exercise.map((exercise,indexExercise) =>

                        exerciseShow[indexExercise]
                      )}
                      </tbody>
                      </Table>
                    </ListGroup>

                    </Col>
                    {initialExercise}
                  </Row>
                </Tab>
                <Tab eventKey={3} title="โหวตคำถาม">
                  <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col md={10}>
                      <FormGroup controlId="formControlsTextarea">
                        <br/>
                        <ControlLabel>คำถามที่ต้องการ</ControlLabel>
                        <FormControl componentClass="textarea"  value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleChange} required="true"/>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <br/>
                      <Button className={s.smQuestion} bsStyle="success" block type="submit">บันทึก</Button>
                    </Col>
                  </Row>
                  </Form>
                  <Row>
                    <Col md={12}>
                      <ControlLabel>รายการคำถาม</ControlLabel>
                    </Col>
                  </Row>
                  <Row>

                    <Col md={12}>

                      {initialQuestion}

                      {this.props.questionStudent.map((questionStudent,) =>

                    <ListGroup   >
                      <ListGroupItem style={{'background-color':'#428bca','color':'white'}} onClick={this.voteSubmit.bind(this, questionStudent.ID)}>
                        <ControlLabel>คำถาม</ControlLabel> : {questionStudent.question}<Badge style={{'background-color':'#b94a48'}}>{questionStudent.vote}</Badge>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ControlLabel>คำตอบ</ControlLabel> : {questionStudent.answer}
                      </ListGroupItem>
                    </ListGroup>
                      )}
                      {this.props.questionOtherStudent.map((questionOtherStudent,) =>

                        <ListGroup>
                          <ListGroupItem onClick={this.voteSubmit.bind(this, questionOtherStudent.ID)}>
                            <ControlLabel>คำถาม</ControlLabel> : {questionOtherStudent.question}<Badge style={{'background-color':'#b94a48'}}>{questionOtherStudent.vote}</Badge>
                          </ListGroupItem>
                          <ListGroupItem>

                            <ControlLabel>คำตอบ</ControlLabel> : {questionOtherStudent.answer}
                          </ListGroupItem>
                        </ListGroup>
                      )}
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey={4} title="แบบประเมิน">
                  <iframe frameBorder="0" src={'http://58.181.171.138/php/student-survey/list-survey.php?course_id='+this.props.course_ID+'&course_section='+this.props.courseSection+'&student_id='+this.props.studentID+'&student_gender='+this.props.studentGender+'&semester='+this.props.semester+'&year='+this.props.year+'&first_name='+this.props.studentFirstName+'&last_name='+this.props.studentLastName} style={{width:'100%',height:'200'}}></iframe>
                </Tab>
              </Tabs>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );

  }


}

export default withStyles(s)(Student);
