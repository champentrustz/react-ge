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
import s from './EditRoom.css';
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

class EditRoom extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Grid>
        <Col md={12}>
          <h1>จัดการห้องเรียน</h1>
        </Col>
        <Row>
          <Col md={8}>
            <Panel header="รายละเอียดห้องเรียน">
              <Form >
                <Table responsive>
                  <thead>
                  <tr>
                    <th >ห้องเรียน</th>
                    <th className="text-center">วิชา</th>
                    <th className="text-center">เวลาเรียน</th>
                    <th className="text-center">จัดการ</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr>
                    <td >SCL701</td>
                    <td >CSS111 : Introduction to Computer</td>
                    <td className="text-center">08:00 - 11:00 น.</td>
                    <td>
                      <Col md={6}>
                        <Button bsStyle="warning" block type="submit">แก้ไข</Button>
                      </Col>
                      <Col md={6}>
                        <Button bsStyle="danger" block type="submit">ลบ</Button>
                      </Col>
                    </td>
                  </tr>
                  <tr>
                    <td >SCL701</td>
                    <td >CSS112 : Computer Programing</td>
                    <td className="text-center">12:00 - 16:00 น.</td>
                    <td>
                      <Col md={6}>
                        <Button bsStyle="warning" block type="submit">แก้ไข</Button>
                      </Col>
                      <Col md={6}>
                        <Button bsStyle="danger" block type="submit">ลบ</Button>
                      </Col>
                    </td>
                  </tr>
                  </tbody>
                </Table>
              </Form>
            </Panel>
          </Col>
          <Col md={4}>
            <Panel header="เพิ่มห้องเรียน">
              <Form >
                <Col md={12}>
                  <ControlLabel>ชื่อห้องเรียน</ControlLabel>
                </Col>
                <Col md={12}>
                  <FormControl/>
                </Col>

                <Col md={12}>
                  <br/>
                  <Button bsStyle="success" block>เพิ่มห้องเรียน</Button>
                </Col>
              </Form>
            </Panel>
          </Col>
          {/*<Col md={4}>*/}
          {/*<Panel header="เพิ่มรายละเอียดห้องเรียน">*/}
          {/*<Form >*/}
          {/*<Col md={12}>*/}
          {/*<ControlLabel>เลือกห้องเรียน</ControlLabel>*/}
          {/*</Col>*/}
          {/*<Col md={8}>*/}
          {/*<FormControl componentClass="select" placeholder="select">*/}
          {/*<option >เลือกห้องเรียน</option>*/}
          {/*<option >SCL706</option>*/}
          {/*<option >SCL602</option>*/}
          {/*</FormControl>*/}
          {/*</Col>*/}
          {/*<Col md={12}>*/}
          {/*<br/>*/}
          {/*<ControlLabel>เพิ่มวิชา</ControlLabel>*/}
          {/*</Col>*/}
          {/*<Col md={12}>*/}
          {/*<FormControl componentClass="select" placeholder="select">*/}
          {/*<option >เลือกวิชา</option>*/}
          {/*<option >CSS111 : Introduction to Computer</option>*/}
          {/*<option >CSS112 : Computer Programing</option>*/}
          {/*</FormControl>*/}
          {/*</Col>*/}
          {/*<Col md={12}>*/}
          {/*<br/>*/}
          {/*<ControlLabel>เพิ่มวิชา</ControlLabel>*/}
          {/*</Col>*/}
          {/*<Col md={12}>*/}
          {/*<FormControl componentClass="select" placeholder="select">*/}
          {/*<option >เลือกวิชา</option>*/}
          {/*<option >CSS111 : Introduction to Computer</option>*/}
          {/*<option >CSS112 : Computer Programing</option>*/}
          {/*</FormControl>*/}
          {/*</Col>*/}
          {/*<Col md={12}>*/}
          {/*<br/>*/}
          {/*<ControlLabel>เพิ่มวิชา</ControlLabel>*/}
          {/*</Col>*/}
          {/*<Col md={12}>*/}
          {/*<FormControl componentClass="select" placeholder="select">*/}
          {/*<option >เลือกวิชา</option>*/}
          {/*<option >CSS111 : Introduction to Computer</option>*/}
          {/*<option >CSS112 : Computer Programing</option>*/}
          {/*</FormControl>*/}
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

export default withStyles(s)(EditRoom);
