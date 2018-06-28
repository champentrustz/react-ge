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
import s from './AddCourseStudent.css';
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

class AddCourseStudent extends React.Component {
  static propTypes = {
    studentDetailAll: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    department: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    studentLatest: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    courseAll: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ' '
    };
  }

  course1Change(event) {
    this.setState({course1: event.target.value});
  }
  course2Change(event) {
    this.setState({course2: event.target.value});
  }

  course3Change(event) {
    this.setState({course3: event.target.value});
  }

  course4Change(event) {
    this.setState({course4: event.target.value});
  }

  saveStudentCourse = event => {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'mutation{studentCreate(code:"'+this.state.code+'",firstName:"'+this.state.firstName+'",lastName:"'+this.state.lastName+'",departmentID:'+this.state.department+'){ ID } }',
      })
    })
    window.location.reload();
    window.open('/admin');

  }



  render() {

    let studentDetail = [];
    let studentLatestDetail = [];
    this.props.studentDetailAll.map((studentDetailAll) => {

      studentDetailAll.departmentID.map((department) => {

        department.facultyID.map((faculty) => {
          studentDetail.push(<tr>
            <td className="text-center">{studentDetailAll.code}</td>
            <td className="text-center">{studentDetailAll.firstName} {studentDetailAll.lastName}</td>
            <td className="text-center">{department.name}</td>
            <td className="text-center">{faculty.name}</td>
            <td>
              <Col md={6}>
                <Button bsStyle="warning" block type="submit">แก้ไข</Button>
              </Col>
              <Col md={6}>
                <Button bsStyle="danger" block type="submit">ลบ</Button>
              </Col>
            </td>
          </tr>);
        })
      })
    })

    this.props.studentLatest.map((studentLatest) => {
      studentLatestDetail.push(
        <Col md={12}>
          <ControlLabel>รหัส : {studentLatest.code}</ControlLabel>
        </Col>,
        <Col md={12}>
          <br/>
              <ControlLabel>ชื่อ : {studentLatest.firstName} {studentLatest.lastName}</ControlLabel>
            </Col>,
            <Col md={12}>
        <br/>
              <FormControl componentClass="select" value={this.state.course1} onChange={this.course1Change.bind(this)}>
                <option>เลือกวิชา*</option>
                {this.props.courseAll.map((courseAll) =>
                  <option value={courseAll.ID}>{courseAll.code} : {courseAll.name}</option>
                )}
              </FormControl>
    </Col>,
        <Col md={12}>
          <br/>
          <FormControl componentClass="select" value={this.state.course2} onChange={this.course2Change.bind(this)}>
            <option>เลือกวิชา*</option>
            {this.props.courseAll.map((courseAll) =>
              <option value={courseAll.ID}>{courseAll.code} : {courseAll.name}</option>
            )}
          </FormControl>
        </Col>,
        <Col md={12}>
          <br/>
          <FormControl componentClass="select" value={this.state.course3} onChange={this.course3Change.bind(this)}>
            <option>เลือกวิชา*</option>
            {this.props.courseAll.map((courseAll) =>
              <option value={courseAll.ID}>{courseAll.code} : {courseAll.name}</option>
            )}
          </FormControl>
        </Col>,
        <Col md={12}>
          <br/>
          <FormControl componentClass="select" value={this.state.course4} onChange={this.course4Change.bind(this)}>
            <option>เลือกวิชา*</option>
            {this.props.courseAll.map((courseAll) =>
              <option value={courseAll.ID}>{courseAll.code} : {courseAll.name}</option>
            )}
          </FormControl>
        </Col>,
        <Col md={12}>
          <br/>
          <Button bsStyle="success" block type="submit">เพิ่มนักศึกษา</Button>
        </Col>)
    })

    return (
      <Grid>
        <Col md={12}>
          <h1>จัดการนักศึกษา</h1>
        </Col>
        <Row>
          <Col md={8}>
            <Panel header="รายละเอียดนักศึกษา">
              <Form >
                <Table responsive>
                  <thead>
                  <tr>
                    <th className="text-center">รหัสนักศึกษา</th>
                    <th className="text-center">ชื่อ</th>
                    <th className="text-center">ภาควิชา</th>
                    <th className="text-center">คณะ</th>
                    <th className="text-center">จัดการ</th>
                  </tr>
                  </thead>

                  <tbody>
                  {studentDetail}
                  </tbody>
                </Table>
              </Form>
            </Panel>
          </Col>
          <Col md={4}>
            <Panel header="เพิ่มคอสเรียนให้นักศึกษา">
              <Form onSubmit={this.saveStudentCourse}>
                {studentLatestDetail}
              </Form>
            </Panel>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(AddCourseStudent);
