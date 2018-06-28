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
import s from './TeacherAssistant.css';
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
  Alert,
  Tabs,
  Tab,
  ListGroup,
  ListGroupItem,
  Badge,
  Radio,
  Table,
  Glyphicon,
  Modal,
} from 'react-bootstrap';


class TeacherAssistant extends React.Component {
  static propTypes = {
    courseID: PropTypes.string.isRequired,
    keyActive: PropTypes.string,
    statusClass: PropTypes.string,
    DATE: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    courseSection: PropTypes.string.isRequired,
    sectionName: PropTypes.string.isRequired,
    exercise: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    checkStudent: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      shareholders : [],
      updateStudent : '',
      update : false,
    }


    this.props.checkStudent.map((checkStudent, index) => {

      this.setState({
        //shareholders: this.state.shareholders.concat([{status: 's', remark: 'd'}]),
        shareholders: this.state.shareholders.push({status: checkStudent.status, remark: checkStudent.note}),
      });
    })

  }

  handleShareholderRemakChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;

      return {...shareholder, remark: evt.target.value};
    });

    this.setState({shareholders: newShareholders});
  }

  handleShareholderStatusChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;


      return {...shareholder, status: evt.target.value};
    });

    this.setState({shareholders: newShareholders});

  }


  backToSelectCourse(){

    window.location.replace("/teacherassistant-course");
  }

  exerciseNameChange(event){
    this.setState({exerciseName: event.target.value});
  }
  exerciseAmountChange(event){
    this.setState({exerciseAmount: event.target.value});
  }


  updateStudentCheck(checkID,checkIndex){

    const data = this.state.shareholders[checkIndex];

    if(data.remark === null){
      data.remark = '';
    }

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{studentCheckinEdit(ID:'+checkID+',note:"'+data.remark+'",status:"'+data.status+'"){ID}}',
      })
    })
    setTimeout(() => {   window.location.reload(); }, 500);

  }


  exerciseCreate(event){
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{exerciseCreate' +
        '(course_id:"'+this.props.courseID+'",section:"'+this.props.courseSection+'",name:"'+this.state.exerciseName+'",amount:'+this.state.exerciseAmount+'){ id } }',
      })
    }).then((response) => response.json()).then(() => {
      window.open("./3", "_self");
    })
    event.preventDefault();
  }


  popUpCreate(exercise_ID){
    const win = window.open('http://58.181.171.138/php/exercise-question/exercise-question-create-session.php?exercise_id='+exercise_ID,'exercise-question-create','width=1200,height=1000');
    var timer = setInterval(function() {
      if(win.closed) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 500);
  }

  popUpUpdate(exercise_ID){
    const win = window.open('http://58.181.171.138/php/exercise-question/exercise-question-update-session.php?exercise_id='+exercise_ID,'exercise-question-update','width=1200,height=1000');
    var timer = setInterval(function() {
      if(win.closed) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 500);
  }

  popUpPreview(exercise_ID){
    const win = window.open('http://58.181.171.138/php/student-exercise/student-exercise-session.php?exercise_id=' + exercise_ID, 'student-exercise', 'width=1200,height=1000');
    var timer = setInterval(function() {
      if(win.closed) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 500);
  }

  deleteExercise(id){
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{deleteExercise(id:'+id+'){ id } }',
      })
    }).then(window.open("./3", "_self"))

  }

  componentDidMount(){

  }

  tabChange(key){
    window.history.pushState( {} , '', './'+key );
  }


  render() {


    let buttonEditStatus = null;
    let initialCheck = [];
    let initialExercise = [];
    let exerciseVar = [];

    initialCheck.push(<tbody><tr><td colSpan="5" className="text-danger text-center">ไม่มีข้อมูลการเช็คชื่อ</td></tr></tbody>);
    initialExercise.push( <Col md={12}><ListGroupItem>
      <h5 className="text-danger">ไม่พบแบบทดสอบ</h5>
    </ListGroupItem></Col>);

    this.props.exercise.map((exercise) =>{
      initialExercise = [];
    })

    this.props.checkStudent.map((check, index) => {

      initialCheck = [];
      buttonEditStatus = <Col md={4} mdOffset={4}>
        <Button bsStyle="primary" block onClick={this.updateStudentCheck.bind(this)}>ยืนยันการแก้ไขข้อมูล</Button>
      </Col>

    })

    this.props.exercise.map((exercise,indexExercise) => {

      if (exercise.exercise_question.length > 0) {

        exerciseVar.push(<tr>
          <td className="text-center">{indexExercise + 1}</td>
          <td>{exercise.name}</td>
          <td><Button bsStyle="primary" onClick={this.popUpPreview.bind(this, exercise.id)}><span className="glyphicon glyphicon-eye-open"/></Button></td>
          <td><Button bsStyle="warning" onClick={this.popUpUpdate.bind(this, exercise.id)}><span className="glyphicon glyphicon-pencil"/></Button></td>
          <td><Button bsStyle="danger" onClick={this.deleteExercise.bind(this, exercise.id)}><span className="glyphicon glyphicon-remove"/></Button></td>
        </tr>)

      }
      else {

        exerciseVar.push(<tr>
          <td className="text-center">{indexExercise + 1}</td>
          <td><a onClick={this.popUpCreate.bind(this, exercise.id)} style={{'cursor': 'pointer'}}>{exercise.name}</a></td>
          <td><Button bsStyle="primary" className="disabled"><span className="glyphicon glyphicon-eye-open"/></Button></td>
          <td><Button bsStyle="warning" className="disabled"><span className="glyphicon glyphicon-pencil"/></Button></td>
          <td><Button bsStyle="danger" onClick={this.deleteExercise.bind(this, exercise.id)}><span className="glyphicon glyphicon-remove"/></Button></td>
        </tr>)

      }
    })


    return (
      <Grid>

        <Modal
          show={this.state.update}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Body>
            <h5 className="text-danger">กรุณารอสักครู่.... กำลังแก้ไขข้อมูล</h5>
          </Modal.Body>
        </Modal>
        <Row>

          <Col md={10} mdOffset={1}>
            <h1>
              {this.props.statusClass === 'manage' &&
              <span>
                จัดการห้องเรียน&nbsp;
              </span>
              }
              {this.props.courseName} ({this.props.courseID})
            </h1>
            <h1>
              กลุ่มเรียน : {this.props.sectionName}
            </h1>
            {this.props.statusClass === 'manage' &&
            <h4 className="text-danger">
              หากต้องการดูข้อมูลนักศึกษา กรุณาเลือกห้องเรียนเพื่อเข้าห้องเรียน
            </h4>
            }
          </Col>

        </Row>


        {this.props.statusClass === 'manage' &&
        <Row>
          <Col md={4} mdOffset={1}>
        <Panel bsStyle="warning">
          <Button bsStyle="warning" block type="button" onClick={this.backToSelectCourse.bind(this)}>เลือกห้องเรียน</Button>
        </Panel>
          </Col>
        </Row>
        }


        <br/>

        <Row>

          {/*<Col md={4}>*/}

            {/*<Panel  collapsible header="เปลี่ยนรหัสผ่าน"  bsStyle="warning" style={{'cursor': 'pointer'}}>*/}
              {/*<ListGroup fill>*/}
                {/*<ListGroupItem>*/}
                  {/*<Form>*/}
                    {/*<FormGroup>*/}
                      {/*<ControlLabel>รหัสผ่านเดิม</ControlLabel>*/}
                      {/*<FormControl type="text"></FormControl>*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup>*/}
                      {/*<ControlLabel>รหัสผ่านใหม่</ControlLabel>*/}
                      {/*<FormControl type="text"></FormControl>*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup>*/}
                      {/*<ControlLabel>ยืนยันรหัสผ่านใหม่</ControlLabel>*/}
                      {/*<FormControl type="text"></FormControl>*/}
                    {/*</FormGroup>*/}
                    {/*<br/>*/}
                    {/*<div className="text-center">*/}
                      {/*<Button bsStyle="success">ตกลง</Button>*/}
                    {/*</div>*/}
                  {/*</Form>*/}
                {/*</ListGroupItem>*/}
              {/*</ListGroup>*/}
            {/*</Panel>*/}
          {/*</Col>*/}

          <Col md={10} mdOffset={1}>
            <Panel>
              <Tabs defaultActiveKey={parseInt(this.props.keyActive)} id="uncontrolled-tab-example" onSelect={this.tabChange}>
                <Tab eventKey={1} title="เอกสารประกอบการสอน">

                  <iframe frameBorder="0" src={'http://58.181.171.138/php/upload/upload-file.php?course_id='+this.props.courseID+'&course_section='+this.props.courseSection} style={{width:'100%',height:'200'}}></iframe>
                  <iframe frameBorder="0" src={'http://58.181.171.138/php/upload/view-file.php?course_id='+this.props.courseID+'&course_section='+this.props.courseSection} style={{width:'100%',height:'200'}}></iframe>

                </Tab>
                {
                  this.props.statusClass === 'class' &&
                  <Tab eventKey={2} title="ข้อมูลการเข้าเรียน">
                    <br/>
                    <Row>
                      <iframe frameBorder="0"
                              src={'http://58.181.171.138/php/check/check-student-detail.php?course_id=' + this.props.courseID + '&course_section=' + this.props.courseSection + '&course_start=' + this.props.courseStartTime + '&course_end=' + this.props.courseEndTime + '&course_date=' + this.props.DATE}
                              style={{width: '100%', height: '600'}}></iframe>
                      {/*<Col md={12}>*/}
                      {/*<Form >*/}
                      {/*<Table responsive>*/}
                      {/*<thead>*/}
                      {/*<tr>*/}
                      {/*<th className="text-center">ลำดับ</th>*/}
                      {/*<th>รหัสนักศึกษา</th>*/}
                      {/*<th>ชื่อ-สกุล</th>*/}
                      {/*<th>*/}
                      {/*<center>สถานะ</center>*/}
                      {/*</th>*/}
                      {/*<th>*/}
                      {/*<center>หมายเหตุ</center>*/}
                      {/*</th>*/}
                      {/*<th>*/}
                      {/*<center>แก้ไข</center>*/}
                      {/*</th>*/}
                      {/*</tr>*/}
                      {/*</thead>*/}

                      {/*{initialCheck}*/}

                      {/*{this.props.checkStudent.map((check, index) =>*/}
                      {/*<tbody>*/}
                      {/*<tr>*/}
                      {/*<td className="text-center">{index + 1}</td>*/}
                      {/*<td>{check.studentID}</td>*/}
                      {/*<td>{check.firstName} {check.lastName}</td>*/}
                      {/*<td>*/}
                      {/*<FormGroup controlId="formControlsSelect">*/}
                      {/*<FormControl componentClass="select" value={this.state.status}*/}
                      {/*onChange={this.handleShareholderStatusChange(index)}>*/}
                      {/*{check.status == "NORMAL" && <option value="NORMAL" selected>มาตรงเวลา</option>}*/}
                      {/*{check.status != "NORMAL" && <option value="NORMAL">มาตรงเวลา</option>}*/}
                      {/*{check.status == "LATE" && <option value="LATE" selected>มาสาย</option>}*/}
                      {/*{check.status != "LATE" && <option value="LATE">มาสาย</option>}*/}
                      {/*{check.status == "ABSENT" && <option value="ABSENT" selected>ขาดเรียน</option>}*/}
                      {/*{check.status != "ABSENT" && <option value="ABSENT">ขาดเรียน</option>}*/}
                      {/*</FormControl>*/}
                      {/*</FormGroup>*/}
                      {/*</td>*/}
                      {/*<td>*/}

                      {/*{this.state.shareholders.map((shareholders, indexShare) =>*/}

                      {/*indexShare === index &&*/}
                      {/*<FormControl type="text"*/}
                      {/*value={shareholders.remark}*/}
                      {/*onChange={this.handleShareholderRemakChange(index)}*/}
                      {/*/>*/}

                      {/*)}*/}

                      {/*</td>*/}
                      {/*<td className="text-center">*/}
                      {/*<Button bsStyle="warning" onClick={this.updateStudentCheck.bind(this,check.ID,index)}><Glyphicon glyph="pencil" /></Button>*/}
                      {/*</td>*/}
                      {/*</tr>*/}
                      {/*</tbody>*/}
                      {/*)}*/}
                      {/*</Table>*/}

                      {/*</Form>*/}
                      {/*</Col>*/}
                    </Row>
                  </Tab>
                }
                <Tab eventKey={3} title="แบบทดสอบ">
                  <br/>
                  <Row>
                    <Col md={12}>
                      <Panel header="สร้างแบบทดสอบ">
                        <ListGroup>
                          <Form onSubmit={this.exerciseCreate.bind(this)}>
                          <Col md={12}>
                            <ControlLabel>ชื่อแบบทดสอบ</ControlLabel>
                          </Col>
                          <Col md={12}>
                            <FormControl type="text" value={this.state.exerciseName} onChange={this.exerciseNameChange.bind(this)} />
                          </Col>
                          <Col md={12}>
                            <ControlLabel>จำนวนข้อสอบ</ControlLabel>
                          </Col>
                          <Col md={12}>
                            <FormControl type="number" value={this.state.exerciseAmount} onChange={this.exerciseAmountChange.bind(this)} />
                          </Col>
                            <Col md={6} mdOffset={3}>
                              <br/>
                              <Button bsStyle="success" block type="submit">สร้างแบบทดสอบ</Button>
                            </Col>
                          </Form>
                        </ListGroup>
                      </Panel>
                      <Panel header="แบบทดสอบที่มี">
                        <ListGroup>
                          <Col md={12}>
                            <br/>
                            <Table>
                              <thead>
                              <tr>
                                <th className="text-center">ลำดับ</th>
                                <th >ชื่อแบบทดสอบ</th>
                                <th >แก้ไข</th>
                                <th >ลบ</th>
                              </tr>
                              </thead>
                              <tbody>
                              {exerciseVar}
                              </tbody>
                            </Table>
                          </Col>

                        </ListGroup>
                        <br/>
                        {initialExercise}
                      </Panel>
                    </Col>
                  </Row>
                </Tab>



              </Tabs>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(TeacherAssistant);
