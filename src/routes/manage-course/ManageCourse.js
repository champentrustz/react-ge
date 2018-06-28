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
import s from './ManageCourse.css';
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

class ManageCourse extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    courseAll: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ' '
    };
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


  saveCourse(){

    const rawDate = ''+this.state.startDate;
    const date = rawDate.substring(3,5);
    const month = rawDate.substring(0,2);
    const year = rawDate.substring(6,10);
    const finishDate = year+'-'+month+'-'+date;
    const rawStartTime = ''+this.state.time;
    const rawEndTime = ''+this.state.time;
    const startTime = rawStartTime.substring(0,5)+':00';
    const endTime = rawEndTime.substring(8,13)+':00';

    if(this.state.status == "NORMAL") {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'mutation{courseCreate(code:"' + this.state.code + '",name:"' + this.state.name + '",startTime:"' + startTime + '",endTime:"' + endTime + '",' +
          'startDate:"'+finishDate+'",skipStatus:"NORMAL",totalAmount:' + this.state.totalAmount + '){ ID } }',
        })
      })
    }
    if(this.state.status == "SKIP") {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'mutation{courseCreate(code:"' + this.state.code + '",name:"' + this.state.name + '",startTime:"' + startTime + '",endTime:"' + endTime + '",' +
          'startDate:"'+finishDate+'",skipStatus:"SKIP",totalAmount:' + this.state.totalAmount + '){ ID } }',
        })
      })
    }
  }

  render() {

    return (
      <Grid>
        <Col md={12}>
          <h1>จัดการรายวิชา</h1>
        </Col>
        <Row>
          <Col md={8}>
            <Panel header="รายละเอียดวิชา">
              <Form >
                <Table responsive>
                  <thead>
                  <tr>
                    <th className="text-center">รหัสวิชา</th>
                    <th className="text-center">ชื่อวิชา</th>
                    <th className="text-center">เวลาเรียน</th>
                    <th className="text-center">จำนวนครั้ง</th>
                    <th className="text-center">สถานะ</th>
                    <th className="text-center">จัดการ</th>
                  </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </Table>
              </Form>
            </Panel>
          </Col>
          <Col md={4}>
            <Panel header="เพิ่มรายวิชา">
              <Form onSubmit={this.saveCourse}>
                <Col md={12}>
                  <ControlLabel>รหัสวิชา  </ControlLabel>
                </Col>
                <Col md={12}>
                  <FormControl onChange={this.codeChange.bind(this)} value={this.state.code}/>
                </Col>
                <Col md={12}>
                  <br/>
                  <ControlLabel>ชื่อวิชา</ControlLabel>
                </Col>
                <Col md={12}>
                  <FormControl onChange={this.nameChange.bind(this)} value={this.state.name}/>
                </Col>
                <Col md={12}>
                  <br/>
                  <ControlLabel>Section</ControlLabel>
                </Col>
                <Col md={4}>
                  <FormControl type="number" onChange={this.sectionChange.bind(this)} value={this.state.section}/>
                </Col>
                <Col md={12}>
                  <br/>
                  <ControlLabel>เวลาเรียน</ControlLabel>
                </Col>
                <FormGroup >
                <Col md={12}>
                  <Radio name="radioGroup1" inline value="08:00 - 12:00" onChange={this.timeChange.bind(this)} checked={this.state.time === '08:00 - 12:00'}>08:00 - 12:00 น.</Radio>
                </Col>
                <Col md={12}>
                  <Radio name="radioGroup1" inline value="12:00 - 16:00" onChange={this.timeChange.bind(this)} checked={this.state.time === '12:00 - 16:00'}>12:00 - 16:00 น.</Radio>
                </Col>
                <Col md={12}>
                  <Radio name="radioGroup1" inline value="16:00 - 20:00" onChange={this.timeChange.bind(this)} checked={this.state.time === '16:00 - 20:00'}>16:00 - 20:00 น.</Radio>
                </Col>
                </FormGroup>
                <Col md={12}>
                  <br/>
                  <ControlLabel>สถานะ</ControlLabel>
                </Col>
                <FormGroup >
                  <Col md={12}>
                    <Radio name="radioGroup2" inline value="NORMAL" onChange={this.statusChange.bind(this)} checked={this.state.status === 'NORMAL'}>ปกติ</Radio>
                  </Col>
                  <Col md={12}>
                    <Radio name="radioGroup2" inline value="SKIP" onChange={this.statusChange.bind(this)} checked={this.state.status === 'SKIP'}>เว้นสัปดาห์</Radio>
                  </Col>
                </FormGroup>
                <Col md={12}>
                  <br/>
                  <ControlLabel>จำนวนครั้งคาบเรียน</ControlLabel>
                </Col>
                <Col md={4}>
                  <FormControl type="number" onChange={this.totalAmountChange.bind(this)} value={this.state.totalAmount}/>
                </Col>
                <Col md={12}>
                  <br/>
                  <ControlLabel>วันเริ่มการเรียนการสอน</ControlLabel>
                </Col>
                <Col md={12}>
                  <FormControl type="date" onChange={this.startDateChange.bind(this)} value={this.state.startDate}/>
                </Col>
                <Col md={12}>
                  <br/>
                  <Button bsStyle="success" block type="submit">เพิ่มรายวิชา</Button>
                </Col>
              </Form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(ManageCourse);
