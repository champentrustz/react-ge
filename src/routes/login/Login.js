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
import s from './Login.css';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Row,
  Grid,
  Button,
  Alert,
} from 'react-bootstrap';

let alertWrong = null

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      status:'STUDENT',
    };

  }


  static propTypes = {
    studentDetailAll: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    teacherAll: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    teacherAssistantAll: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    adminAll: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
  };



  componentDidMount(){


    const isStudent = sessionStorage.getItem('isStudent');
    const isTeacher = sessionStorage.getItem('isTeacher');
    const isTeacherAssistant = sessionStorage.getItem('isTeacherAssistant');
    const isAdmin = sessionStorage.getItem('isAdmin');
    if(isStudent === 'true'){
      window.location.replace("/student-course");
    }
    if(isTeacher === 'true'){
      window.location.replace("/teacher-course");
    }
    if(isTeacherAssistant === 'true'){
      window.location.replace("/teacherassistant-course");
    }
    if(isAdmin === 'true'){
      window.location.replace("/admin/1");
    }
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };


async studentLogin(){

  const resp = await  fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/studentlogin', {
    method: 'post',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify({
      apiKey : "afab7e2f35fe11c45116e2315e7387b6",
      sReturn : "1",
      student_username : this.state.username,
      student_password : this.state.password
    }),
  });
  const  data  = await resp.json();
  const dataStudent = data.data;

    if (data.status === 1) {


        sessionStorage.setItem('isStudent', 'true');
        sessionStorage.setItem('studentFirstName', dataStudent.studentName);
        sessionStorage.setItem('studentLastName', dataStudent.studentLastname);
        sessionStorage.setItem('studentUsername', this.state.username);
        sessionStorage.setItem('studentPassword', this.state.password);
        sessionStorage.setItem('studentGender', dataStudent.studentGender);
        window.open('/student-course', "_self");


    }
    else{
      alertWrong = <Col md={6} mdOffset={3}><Alert bsStyle="danger">ผิดพลาด!
        กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง</Alert></Col>
      this.setState({username: ""});
      this.setState({password: ""});
    }
}

  async teacherLogin(){

    const resp = await  fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/teacherlogin', {
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        apiKey : "afab7e2f35fe11c45116e2315e7387b6",
        sReturn : "1",
        teacher_username : this.state.username,
        teacher_password : this.state.password
      }),
    });
    const  data  = await resp.json();
    const dataTeacher = data.data;

    if (data.status === 1) {

      sessionStorage.setItem('isTeacher', 'true');
      sessionStorage.setItem('teacherID', dataTeacher.teacherID);
      sessionStorage.setItem('teacherFirstName', dataTeacher.teacherName);
      sessionStorage.setItem('teacherLastName', dataTeacher.teacherLastname);
      sessionStorage.setItem('teacherUsername', this.state.username);
      sessionStorage.setItem('teacherPassword', this.state.password);
      window.open('/teacher-course', "_self");


    }
    else{
      alertWrong = <Col md={6} mdOffset={3}><Alert bsStyle="danger">ผิดพลาด!
        กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง</Alert></Col>
      this.setState({username: ""});
      this.setState({password: ""});
    }
  }

  async teacherAssistantLogin(){

    const resp = await fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/talogin', {
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        apiKey : "afab7e2f35fe11c45116e2315e7387b6",
        sReturn : "1",
        ta_username : this.state.username,
        ta_password : this.state.password
      }),
    });

    const  data  = await resp.json();
    const dataTeacherAssistant = data.data;


    if (data.status === 1) {

      sessionStorage.setItem('isTeacherAssistant', 'true');
      sessionStorage.setItem('teacherAssistantFirstName', dataTeacherAssistant.taName);
      sessionStorage.setItem('teacherAssistantLastName', dataTeacherAssistant.taLastname);
      sessionStorage.setItem('teacherAssistantUsername', this.state.username);
      sessionStorage.setItem('teacherAssistantPassword', this.state.password);
      window.open('/teacherassistant-course', "_self");


    }
    else{
      alertWrong = <Col md={6} mdOffset={3}><Alert bsStyle="danger">ผิดพลาด!
        กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง</Alert></Col>
      this.setState({username: ""});
      this.setState({password: ""});
    }
  }

  async adminLogin(){

    const resp = await fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/talogin', {
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        apiKey : "afab7e2f35fe11c45116e2315e7387b6",
        sReturn : "1",
        ta_username : this.state.username,
        ta_password : this.state.password
      }),
    });

    const  data  = await resp.json();
    const dataTeacherAssistant = data.data;


    if (data.status === 1) {

      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.setItem('adminFirstName', dataTeacherAssistant.taName);
      sessionStorage.setItem('adminLastName', dataTeacherAssistant.taLastname);
      window.open('/admin/1', "_self");


    }
    else{
      alertWrong = <Col md={6} mdOffset={3}><Alert bsStyle="danger">ผิดพลาด!
        กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง</Alert></Col>
      this.setState({username: ""});
      this.setState({password: ""});
    }

  }


   submitLogin= event =>{

    if(this.state.status == "STUDENT"){
      this.studentLogin();
    }
    if(this.state.status == "TEACHER"){
      this.teacherLogin();
    }

     if(this.state.status == "TEACHER-ASSISTANT"){
       this.teacherAssistantLogin();
     }

     if(this.state.status == "ADMIN"){
       this.adminLogin();
     }

    event.preventDefault();
  };


  statusChange(event) {
    this.setState({status: event.target.value});
  }

  render() {


    return (
      <Grid>


        {/*<iframe frameBorder="0" src={'http://58.181.171.138/php/detect-browser/check-browser.php'} style={{width:'100%',height:'100'}}></iframe>*/}

        <Row>
          <Col md={12}>
            <Row className="text-center">
              <img
                src="http://58.181.171.138/php/img/ssru-logo.png"
                width="304"
                height="236"
              />
            </Row>
            <Row className="text-center">
              <h1>GE Smart Classroom</h1>
            </Row>


              <Row>
                {alertWrong}
              </Row>
            <Row>
              <Form horizontal onSubmit={this.submitLogin.bind(this)}>
                <Grid>
                  <Row>
                    <Col md={3}/>
                    <Col md={2}>
                      <FormGroup controlId="password">
                        <Col sm={12}>
                          <FormControl componentClass="select" value={this.state.status} onChange={this.statusChange.bind(this)} >
                            <option value="STUDENT" >นักศึกษา</option>
                            <option value="TEACHER">อาจารย์</option>
                            <option value="TEACHER-ASSISTANT">ผู้ช่วยอาจารย์</option>
                            <option value="ADMIN">ผู้ดูแลระบบ</option>
                          </FormControl>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md={3}/>
                  </Row>
                  <Row>
                    <Col md={3}/>
                    <Col md={6}>
                      <FormGroup controlId="username">
                        <Col sm={12}>
                          <FormControl
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                            placeholder="ชื่อผู้ใช้/รหัสนักศึกษา"
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md={3}/>
                  </Row>
                  <Row>
                    <Col md={3}/>
                    <Col md={6}>
                      <FormGroup controlId="password">
                        <Col sm={12}>
                          <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="รหัสผ่าน"
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md={3}/>
                  </Row>

                  <Row>
                    <Col mdOffset={3} md={6}>
                      <Button bsStyle="success" type="submit" block>
                        เข้าสู่ระบบ
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col mdOffset={3} md={6}>
                      <br/>
                      ดาวน์โหลด Google Chrome <a href="http://58.181.171.138/php/download/function-download-google-chrome.php">คลิก</a>
                    </Col>
                  </Row>
                </Grid>
              </Form>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(Login);
