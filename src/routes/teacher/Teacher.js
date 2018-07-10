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
import s from './Teacher.css';
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
  Modal,
  Table,
  ResponsiveEmbed,
  Glyphicon,
  Alert,
} from 'react-bootstrap';



class Teacher extends React.Component {
  static propTypes = {
    course: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    keyActive: PropTypes.string,
    statusClass: PropTypes.string,
    courseID: PropTypes.string.isRequired,
    teacherID: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    sectionName: PropTypes.string.isRequired,
    groupScheduleID: PropTypes.string.isRequired,
    courseStartTime: PropTypes.string.isRequired,
    courseEndTime: PropTypes.string.isRequired,
    courseSection: PropTypes.string.isRequired,
    checkStudent: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    question: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    exercise: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    exerciseStudentScore: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    courseStudent: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,

  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      shareholders : [],
      shareholders2 : [],
      endClass : false,

    };


    this.props.checkStudent.map((checkStudent, index) => {

      this.setState({
        //shareholders: this.state.shareholders.concat([{status: 's', remark: 'd'}]),
        shareholders: this.state.shareholders.push({status: checkStudent.status, remark: checkStudent.note}),
      });
    })



    this.props.question.map((question, index) => {
      this.setState({
        shareholders2: this.state.shareholders2.push({answer: question.answer}),
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

  handleShareholderAnswerChange = (idx) => (evt) => {
    const newShareholders2 = this.state.shareholders2.map((shareholder2, sidx) => {
      if (idx !== sidx) return shareholder2;

      return {...shareholder2, answer: evt.target.value};
    });

    this.setState({shareholders2: newShareholders2});

  }

  // handleSubmit = (evt) => {
  //   const {remark, shareholders} = this.state;
  //   alert(`Incorporated: ${remark} with ${shareholders.length} shareholders`);
  // }

  // handleAddShareholder = () => {
  //   this.setState({
  //     shareholders: this.state.shareholders.concat([{remark: ''}])
  //   });
  // }
  //
  // handleRemoveShareholder = (idx) => () => {
  //   this.setState({
  //     shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
  //   });
  // }


  handleShareholderStatusChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;


      return {...shareholder, status: evt.target.value};
    });

    this.setState({shareholders: newShareholders});

  }



  tabChange(key){
    window.history.pushState( {} , '', './'+key );
  }

  checkin = event => {

    const rand = Math.floor(Math.random() * 900000) + 100000;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{codeCheckinUpdate(code:"' + this.props.courseID + '",section:"'+this.props.courseSection+'",checkinCode:"' + rand + '") {ID}}',
      })
    }).then((response) => response.json())
      .then(() => {
        window.location.reload();
      })
    this.setState({random: this.state.random + rand});
    event.preventDefault();
  }

  checkout = event => {

    const rand = Math.floor(Math.random() * 900000) + 100000;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{codeCheckoutUpdate(code:"' + this.props.courseID + '",section:"'+this.props.courseSection+'",checkoutCode:"' + rand + '") {ID}}',
      })
    }).then((response) => response.json())
      .then(() => {
        window.location.reload();
      })
    this.setState({random: this.state.random + rand});
    event.preventDefault();
  };


  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }


  remarkChange(e) {
    this.setState({remark: e.target.value});
  }

  statusChange(e, idx) {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;


      return {...shareholder, status: e.target.value};
    });

    this.setState({shareholders: newShareholders}, () => {

    });

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
                    query: 'mutation{studentCheckinEdit(ID:'+checkID+',note:"'+data.remark+'",status:"'+data.status+'",teacherID:"'+this.props.teacherID+'"){ID}}',
                  })
                })

    setTimeout(() => {   window.location.reload(); }, 500);
  }


  answerSubmit(questionID,indexQuestion){

    const ans = this.state.shareholders2[indexQuestion];

    if(ans.answer === null){
      ans.answer = '';
    }

            fetch('/graphql', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: 'mutation{answerCreate(ID:'+questionID+',answer:"'+ans.answer+'"){ID}}',
              })
            })

    window.open("./3", "_self");
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
      window.open("./4", "_self");
    })
    event.preventDefault();
  }


    async endClass(event){


      this.setState({endClass: true});

      let statusCheckin = null;
      const d = new Date();
      const mm = ("0" + (d.getMonth() + 1)).slice(-2);
      const dd = ("0" + (d.getDate())).slice(-2);
      const yyyy = d.getFullYear();
      const myDateString = yyyy + '-' + mm + '-' + dd ; //(US)
      const timeLogout =  new Date().toLocaleTimeString('en-US',{ hour12: false });
      const finishDateTime = myDateString + ' ' + timeLogout;





      const resp = await fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/getStudentInGroup', {

        method: 'post',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({
          apiKey : "afab7e2f35fe11c45116e2315e7387b6",
          sReturn : "1",
          subject_id : this.props.courseID,
          group_id : this.props.courseSection
        }),
      });

       const  data  = await resp.json();
        const courseStudent = data.data;

      const respCheck = await fetch('http://58.181.171.138/php/api/checkStudent.php', {

        method: 'post',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({
          course_id : this.props.courseID,
          course_section : this.props.courseSection,
          course_start : this.props.courseStartTime,
          course_end : this.props.courseEndTime,
          course_date : this.props.DATE,

        }),
      });
      const dataCheck = await respCheck.json();

       let returnSuccess = await courseStudent.map((courseStudent) => {

            statusCheckin = 0;

         dataCheck.map((check, indexCheckStudent) =>{


                if (courseStudent.student_id === check.studentID) {
                  statusCheckin = 1;

                }

            })

            if(statusCheckin === 0){


              fetch('/graphql', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  query: 'mutation{checkStudentAbsent(courseID:"'+this.props.courseID+'",section:"'+this.props.courseSection+'",studentID:"'+courseStudent.student_id+'",firstName:"'+courseStudent.student_name+'",lastName:"'+courseStudent.student_lastname+'",status:"ABSENT",' +
                  'checkinDate:"'+finishDateTime+'",checkoutDate:"'+finishDateTime+'"){ID}}',
                })
              })
            }
        })


      return returnSuccess;

  }


  async postDataToTSS(a){

    let statusCheck = null;
    let attendTime = null;
    let attendTimeExit = null;
    let attendTimeIn = null
    let attendTimeInMinute = null;
    let attendTimeInHour = null;
    let attendTimeOutMinute = null;
    let attendTimeOutHour = null;


    const respCheck = await fetch('http://58.181.171.138/php/api/checkStudent.php', {

        method: 'post',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({
          course_id : this.props.courseID,
          course_section : this.props.courseSection,
          course_start : this.props.courseStartTime,
          course_end : this.props.courseEndTime,
          course_date : this.props.DATE,

        }),
      });
    const dataCheck = await respCheck.json();



    let returnSuccess = await dataCheck.map((check, indexCheckStudent) =>{


      attendTime =  check.checkinDate.substr(11,5);
      attendTimeInMinute =  parseInt(check.checkinDate.substr(14,2));
      attendTimeInHour =  parseInt(check.checkinDate.substr(11,2));

      if(check.checkoutDate === null){
        attendTimeExit = '00:00';
        attendTimeOutMinute = 0;
        attendTimeOutHour = 0;
        attendTimeIn = '0';
      }
      else{
        attendTimeExit =  check.checkoutDate.substr(11,5);
        attendTimeOutMinute =  parseInt(check.checkoutDate.substr(14,2));
        attendTimeOutHour =  parseInt(check.checkoutDate.substr(11,2));
        attendTimeIn = ((attendTimeOutHour - attendTimeInHour)*60) + Math.abs((attendTimeOutMinute - attendTimeInMinute));
      }





    if(check.status === "NORMAL"){
      statusCheck = "C";
    }
    else if(check.status === "LATE"){
      statusCheck = "CL";
    }
    else if(check.status === "ABSENT"){
      statusCheck = "A";
    }


      fetch('http://ge-tss.ssru.ac.th/index.php/Checkinapi/saveAttend ', {

        method: 'post',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({
          apiKey : "afab7e2f35fe11c45116e2315e7387b6",
          student_id : check.studentID,
          group_schedule_id : this.props.groupScheduleID,
          attend_time : attendTime,
          attend_time_exit : attendTimeExit,
          attend_time_in : attendTimeIn,
          attend_status : statusCheck,
          attend_teacher_note : check.note,
          teacher_id : check.teacherID,
          sReturn : "1",
        }),
      });

  })

    return returnSuccess;
  }

 async  resetCode(b){

    //this.setState({endClass: true});


    let resetCheckin = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{codeCheckinUpdate(code:"' + this.props.course_ID + '",section:"'+this.props.courseSection+'",checkinCode:'+null+') {ID}}',
      })
    })

    let resetCheckout = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{codeCheckoutUpdate(code:"' + this.props.course_ID + '",section:"'+this.props.courseSection+'",checkoutCode:'+null+') {ID}}',
      })
    })

   return resetCheckout;



  }

  backToSelectCourse(){

    window.location.replace("/teacher-course");
  }



async endClassAction(){

      let a = await this.endClass();
      let  b = await this.postDataToTSS(a);
      let  c = await this.resetCode(b);
      this.logoutRedirect(c)

}



logoutRedirect(b){
  sessionStorage.clear();
  setTimeout(() => {  this.setState({endClass: false});}, 3000);
  setTimeout(() => { window.location.replace("/");}, 3100);
}

exerciseNameChange(event){
    this.setState({exerciseName: event.target.value});
  }
  exerciseAmountChange(event){
    this.setState({exerciseAmount: event.target.value});
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
    }).then(window.open("./4", "_self"))

  }

  componentDidMount(){



  }

  render() {

    console.log(this.props.statusClass);


    let buttonEditStatus = null;
    let initialCheck = [];
    let time = new Date().toLocaleString([]);
    let initialQuestion = [];
    let initialExercise = [];
    let initialStudentExercise = [];
    let ExercisestudentScoreVar = [];
    let studentScoreVar = [];
    let exerciseVar = [];



    initialQuestion.push( <ListGroupItem>
      <h5 className="text-danger">ไม่พบรายการคำถาม</h5>
    </ListGroupItem>);

    initialExercise.push( <Col md={12}><ListGroupItem>
      <h5 className="text-danger">ไม่พบแบบทดสอบ</h5>
    </ListGroupItem></Col>);

    initialStudentExercise.push( <br/>,<ListGroupItem>
      <h5 className="text-danger">ไม่พบแบบทดสอบ</h5>
    </ListGroupItem>);


    initialCheck.push(<tbody><tr><td colSpan="5" className="text-danger text-center">ไม่พบข้อมูลการเช็คชื่อ</td></tr></tbody>);

    this.props.exerciseStudentScore.map((exerciseStudentScore) =>{
      initialExercise = [];
      initialStudentExercise =[];
      ExercisestudentScoreVar.push([]);
    })




    this.props.question.map((question) =>{
      initialQuestion = [];
    })

    this.props.checkStudent.map((check, index) => {

      initialCheck = [];



    })



    this.props.course.map((course) =>{
      if(course.checkinCode === null){
        const rand = Math.floor(Math.random() * 900000) + 100000;
        fetch('/graphql', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: 'mutation{codeCheckinUpdate(code:"' + this.props.courseID + '",section:"'+this.props.courseSection+'",checkinCode:"' + rand + '") {ID}}',
          })
        }).then(() => {
          window.location.reload();
        })
      }
      if(course.checkoutCode === null){
        const rand = Math.floor(Math.random() * 900000) + 100000;
        fetch('/graphql', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: 'mutation{codeCheckoutUpdate(code:"' + this.props.courseID + '",section:"'+this.props.courseSection+'",checkoutCode:"' + rand + '") {ID}}',
          })
        }).then(() => {
          window.location.reload();
        })
      }

    })

    this.props.exercise.map((exercise,indexExercise) => {

      if (exercise.exercise_question.length > 0) {

        exerciseVar.push(<tr>
          <td>{indexExercise + 1}</td>
          <td>{exercise.name}</td>
          <td><Button bsStyle="primary" onClick={this.popUpPreview.bind(this, exercise.id)}><span className="glyphicon glyphicon-eye-open"/></Button></td>
          <td><Button bsStyle="warning" onClick={this.popUpUpdate.bind(this, exercise.id)}><span className="glyphicon glyphicon-pencil"/></Button></td>
          <td><Button bsStyle="danger" onClick={this.deleteExercise.bind(this, exercise.id)}><span className="glyphicon glyphicon-remove"/></Button></td>
        </tr>)

      }
      else {

        exerciseVar.push(<tr>
          <td>{indexExercise + 1}</td>
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
          show={this.state.endClass}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Body>
            <h5 >กรุณารอสักครู่..... กำลังจบการสอน</h5>
          </Modal.Body>
        </Modal>
        <Row>
          {/*{time}*/}
            <Col md={12}>

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
                หากต้องการเปิดห้องเรียน กรุณาเลือกห้องเรียนเพื่อเข้าห้องเรียน
              </h4>
              }
            </Col>

        </Row>
        <br/>
        <Row>

          <Col md={4}>

            {this.props.statusClass === 'manage' &&
            <Panel bsStyle="warning">
              <Button bsStyle="warning" block type="button" onClick={this.backToSelectCourse.bind(this)}>เลือกห้องเรียน</Button>
            </Panel>
            }

              <Form onSubmit={this.checkin}>
                <div className="panel panel-info" >
                  <div className="panel-heading " >เข้าห้องเรียน</div>
                  <div className="panel-body">
                    <div className="text-center">
                      <ControlLabel>โค๊ดยืนยันตัวตน</ControlLabel>,
                      {this.props.course.map((course) =>
                      <h2 className={s.activateCode}>{course.checkinCode}</h2>
                      )}
                      <br/>
                      <Button bsStyle="success" block type="submit">สุ่มรหัสยืนยัน</Button>
                    </div>
                  </div>
                </div>
              </Form>



              <Form onSubmit={this.checkout}>
                <div className="panel panel-danger" >
                  <div className="panel-heading " >ออกจากห้องเรียน</div>
                  <div className="panel-body">
                    <div className="text-center">
                      <ControlLabel>โค๊ดยืนยันตัวตน</ControlLabel>,
                      {this.props.course.map((course) =>
                      <h2 className={s.activateCode}>{course.checkoutCode}</h2>
                      )}
                      <br/>
                      <Button bsStyle="success" block type="submit">สุ่มรหัสยืนยัน</Button>
                    </div>
                  </div>
                </div>
              </Form>


            {this.props.statusClass === 'class' &&
            <Panel bsStyle="danger">
              <Button bsStyle="danger" block type="button" onClick={this.endClassAction.bind(this)}>จบการสอน</Button>
            </Panel>
            }
            <br/>


          {/*<Panel  bsStyle="warning" collapsible header="เปลี่ยนรหัสผ่าน" style={{'cursor': 'pointer'}} >*/}
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
          </Col>

          <Col md={8}>
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
                              src={'http://58.181.171.138/php/check/check-student-detail.php?course_id=' + this.props.courseID + '&course_section=' + this.props.courseSection + '&course_start=' + this.props.courseStartTime + '&course_end=' + this.props.courseEndTime + '&course_date=' + this.props.DATE + '&teacher_id=' + this.props.teacherID}
                              style={{width: '100%', height: '600'}}></iframe>
                      {/*<Col md={12}>*/}
                      {/*<Form >*/}
                      {/*<Table responsive>*/}
                      {/*<thead>*/}
                      {/*<tr>*/}
                      {/*<th>ลำดับ</th>*/}
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
                {
                  this.props.statusClass === 'class' &&
                <Tab eventKey={3} title="คำถาม">
                  <Row>
                    <Col md={12}>
                      <br/>
                      <ControlLabel>รายการคำถาม</ControlLabel>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      {initialQuestion}
                      {this.props.question.map((question, index) =>
                        <ListGroup>
                          <ListGroupItem>
                            <ControlLabel>คำถาม</ControlLabel>
                            : {question.question}<Badge style={{'background-color':'#b94a48'}}>{question.vote}</Badge>
                          </ListGroupItem>
                          <ListGroupItem>
                            <ControlLabel>คำตอบ</ControlLabel>
                            {this.state.shareholders2.map((shareholders2, indexShare) =>

                              indexShare === index &&
                            <Form >
                              <FormControl type="text"  onChange={this.handleShareholderAnswerChange(index) }  value={shareholders2.answer}/>
                              <br/>
                              <Button bsStyle="success" onClick={this.answerSubmit.bind(this,question.ID,index)}>บันทึก</Button>
                            </Form>
                            )}
                          </ListGroupItem>
                        </ListGroup>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      {/*<Button bsStyle="primary">แสดงคำถามบนหน้าจอขนาดใหญ่</Button>*/}
                    </Col>
                  </Row>
                </Tab>
                }
                <Tab eventKey={4} title="แบบทดสอบ">
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
                                <th >ลำดับ</th>
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
                <Tab eventKey={5} title="คะแนนนักศึกษา">

                  <Row>
                    <Col md={12}>
                      {initialStudentExercise}


                      {this.props.exerciseStudentScore.map((exercise, index) =>
                      <Panel collapsible header={exercise.name+' ('+exercise.total_score+' คะแนน )'} style={{'cursor': 'pointer'}}>
                        <ListGroup >

                                <Col md={12}>
                                  <Table >
                                    <thead>
                                    <tr>
                                      <th className="text-center">ลำดับ</th>
                                      <th>รหัสนักศึกษา</th>
                                      <th>ชื่อ-สกุล</th>
                                      <th>
                                        <center>คะแนน</center>
                                      </th>
                                    </tr>
                                    </thead>

                                    {this.props.courseStudent.map((courseStudent, indexCheckStudent) =>



                                    <tbody>





                                    <tr>
                                      <td className="text-center">{indexCheckStudent + 1}</td>
                                      <td>{courseStudent.student_id}</td>
                                      <td>{courseStudent.student_name} {courseStudent.student_lastname}</td>


                                     <td className="text-center">

                                       {exercise.exercise_student_score.map((exerciseStudentScore, indexExerciseStudentScore) =>

                                       exerciseStudentScore.student_id === courseStudent.student_id  && exerciseStudentScore.total_score

                                       )}


                                       {/*{student.exercise_score.map(function (exercise_score, i) {*/}
                                         {/*if(exercise_score.exercise_id === exercise.id && exercise_score.total_score !== null)*/}
                                       {/*{*/}
                                         {/*return exercise_score.total_score;*/}
                                       {/*}*/}
                                       {/*})*/}
                                       {/*}*/}
                                       </td>
                                    </tr>

                                    </tbody>

                                    )}

                                  </Table>
                                </Col>

                        </ListGroup>
                      </Panel>
                      )}
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Panel>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Body</h2>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

      </Grid>

    );
  }

}



export default withStyles(s)(Teacher);
