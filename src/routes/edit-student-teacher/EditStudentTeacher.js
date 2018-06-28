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
import s from './EditStudentTeacher.css';
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
  Table,
  Thumbnail
} from 'react-bootstrap';

class EditStudentTeacher extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    studentDetail: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    department: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    teacherDetail: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    teacherAssistantDetail: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    contextStatus: PropTypes.string.isRequired,
    contextID: PropTypes.string.isRequired,

  };

  constructor(props) {
    super(props);
    if(this.props.contextStatus == "STUDENT"){
      this.props.studentDetail.map((student) => {
        student.departmentID.map((department) => {
          this.state = {
            code: student.code,
            firstName: student.firstName,
            lastName: student.lastName,
            department: department.ID,
          };
        })
      })
    }
    if(this.props.contextStatus == "TEACHER"){
      this.props.teacherDetail.map((teacher) => {
        teacher.departmentID.map((department) => {
          this.state = {
            code: teacher.code,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            department: department.ID,
          };
        })
      })
    }
    if(this.props.contextStatus == "TEACHER-ASSISTANT"){
      this.props.teacherAssistantDetail.map((teacherAssistant) => {
        teacherAssistant.departmentID.map((department) => {
          this.state = {
            code: teacherAssistant.code,
            firstName: teacherAssistant.firstName,
            lastName: teacherAssistant.lastName,
            department: department.ID,
          };
        })
      })
    }

  }

  codeChange(event) {
    this.setState({code: event.target.value});
  }
  firstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  lastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  departmentChange(event) {
    this.setState({department: event.target.value});
  }


  updateDetail(){
    if(this.props.contextStatus == "STUDENT") {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'mutation{studentUpdate(ID:' + this.props.contextID + ',code:"'+this.state.code+'",firstName:"'+this.state.firstName+'"' +
          ',lastName:"'+this.state.lastName+'",departmentID:'+this.state.department+'){ ID } }',
        })
      })
      window.location.reload();
    }
    if(this.props.contextStatus == "TEACHER") {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'mutation{teacherUpdate(ID:' + this.props.contextID + ',code:"'+this.state.code+'",firstName:"'+this.state.firstName+'"' +
          ',lastName:"'+this.state.lastName+'",departmentID:'+this.state.department+'){ ID } }',
        })
      })
      window.location.reload();
    }
    if(this.props.contextStatus == "TEACHER-ASSISTANT") {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'mutation{teacherAssistantUpdate(ID:' + this.props.contextID + ',code:"'+this.state.code+'",firstName:"'+this.state.firstName+'"' +
          ',lastName:"'+this.state.lastName+'",departmentID:'+this.state.department+'){ ID } }',
        })
      })
      window.location.reload();
    }
  }

  render() {
    let studentDetail = [];
    let teacherDetail = [];
    let teacherAssistantDetail = [];

    if(this.props.contextStatus == "STUDENT") {

      this.props.studentDetail.map((student) => {

          studentDetail.push(
            <Col md={12}>
              <ControlLabel><h4>Student</h4></ControlLabel>
            </Col>,
            <Col md={12}>
              <br/>
              <ControlLabel>รหัส</ControlLabel>
            </Col>,
            <Col md={12}>
              <FormControl value={this.state.code} onChange={this.codeChange.bind(this)}/>
            </Col>,
            <Col md={12}>
              <br/>
              <ControlLabel>ชื่อ</ControlLabel>
            </Col>,
            <Col md={12}>
              <FormControl value={this.state.firstName} onChange={this.firstNameChange.bind(this)}/>
            </Col>,
            <Col md={12}>
              <br/>
              <ControlLabel>นามสกุล</ControlLabel>
            </Col>,
            <Col md={12}>
              <FormControl value={this.state.lastName} onChange={this.lastNameChange.bind(this)}/>
            </Col>,
            <Col md={12}>
              <br/>
              <ControlLabel>ภาควิชา</ControlLabel>
            </Col>,
            <Col md={6}>
              <FormControl componentClass="select" value={this.state.department} onChange={this.departmentChange.bind(this)}>
                {this.props.department.map((department) =>
                  <option value={department.ID}>{department.name}</option>
                )}
              </FormControl>
            </Col>)
        })

    }

    if(this.props.contextStatus == "TEACHER") {

      this.props.teacherDetail.map((teacher) => {

        teacherDetail.push(
          <Col md={12}>
            <ControlLabel><h4>Teacher</h4></ControlLabel>
          </Col>,
          <Col md={12}>
            <br/>
            <ControlLabel>รหัส</ControlLabel>
          </Col>,
          <Col md={12}>
            <FormControl value={this.state.code} onChange={this.codeChange.bind(this)}/>
          </Col>,
          <Col md={12}>
            <br/>
            <ControlLabel>ชื่อ</ControlLabel>
          </Col>,
          <Col md={12}>
            <FormControl value={this.state.firstName} onChange={this.firstNameChange.bind(this)}/>
          </Col>,
          <Col md={12}>
            <br/>
            <ControlLabel>นามสกุล</ControlLabel>
          </Col>,
          <Col md={12}>
            <FormControl value={this.state.lastName} onChange={this.lastNameChange.bind(this)}/>
          </Col>,
          <Col md={12}>
            <br/>
            <ControlLabel>ภาควิชา</ControlLabel>
          </Col>,
          <Col md={6}>
            <FormControl componentClass="select" value={this.state.department} onChange={this.departmentChange.bind(this)}>
              {this.props.department.map((department) =>
                <option value={department.ID}>{department.name}</option>
              )}
            </FormControl>
          </Col>)
      })

    }

    if(this.props.contextStatus == "TEACHER-ASSISTANT") {

      this.props.teacherAssistantDetail.map((teacherAssistant) => {

        teacherAssistantDetail.push(
          <Col md={12}>
            <ControlLabel><h4>Teacher Assistant</h4></ControlLabel>
          </Col>,
          <Col md={12}>
            <br/>
            <ControlLabel>รหัส</ControlLabel>
          </Col>,
          <Col md={12}>
            <FormControl value={this.state.code} onChange={this.codeChange.bind(this)}/>
          </Col>,
          <Col md={12}>
            <br/>
            <ControlLabel>ชื่อ</ControlLabel>
          </Col>,
          <Col md={12}>
            <FormControl value={this.state.firstName} onChange={this.firstNameChange.bind(this)}/>
          </Col>,
          <Col md={12}>
            <br/>
            <ControlLabel>นามสกุล</ControlLabel>
          </Col>,
          <Col md={12}>
            <FormControl value={this.state.lastName} onChange={this.lastNameChange.bind(this)}/>
          </Col>,
          <Col md={12}>
            <br/>
            <ControlLabel>ภาควิชา</ControlLabel>
          </Col>,
          <Col md={6}>
            <FormControl componentClass="select" value={this.state.department} onChange={this.departmentChange.bind(this)}>
              {this.props.department.map((department) =>
                <option value={department.ID}>{department.name}</option>
              )}
            </FormControl>
          </Col>)
      })

    }
    return (
      <Grid>
        <Col md={12}>
          <h1>แก้ไขผู้เรียนผู้สอน</h1>
        </Col>
        <Row>
          <Col md={6}>
            <Panel header="รายละเอียดผู้เรียนผู้สอน">
              <Form onSubmit={this.updateDetail.bind(this)}>
                {studentDetail}
                {teacherDetail}
                {teacherAssistantDetail}
                <Col md={12}>
                  <br/>
                  <Button bsStyle="success" block type="submit">แก้ไขผู้เรียนผู้สอน</Button>
                </Col>
              </Form>
            </Panel>
          </Col>
          {/*<Col md={6}>*/}
            {/*<Panel header="เพิ่มห้องเรียน">*/}
              {/*<Form >*/}
                {/*<Col md={12}>*/}
                  {/*<ControlLabel>ชื่อห้องเรียน</ControlLabel>*/}
                {/*</Col>*/}
                {/*<Col md={12}>*/}
                  {/*<FormControl/>*/}
                {/*</Col>*/}

                {/*<Col md={12}>*/}
                  {/*<br/>*/}
                  {/*<Button bsStyle="success" block>เพิ่มห้องเรียน</Button>*/}
                {/*</Col>*/}
              {/*</Form>*/}
            {/*</Panel>*/}
          {/*</Col>*/}
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(EditStudentTeacher);
