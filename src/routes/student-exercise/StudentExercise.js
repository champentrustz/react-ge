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
import s from './StudentExercise.css';
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
  Table
} from 'react-bootstrap';

class StudentExercise extends React.Component {
  static propTypes = {
    exercise_ID: PropTypes.string.isRequired,
    exercise_detail: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    lastQuestion: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    exerciseQuestion: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      shareholders: [{answer:''}],
    };
    this.props.exercise_detail.map((exercise) => {
      for(var i = 0; i < exercise.amount - 1; i ++) {
        this.setState({
          shareholders: this.state.shareholders.push({answer:''}),
        });

      }
    })

  }

  handleShareholderAnswerChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;

      return {...shareholder, answer: evt.target.value};
    });

    this.setState({shareholders: newShareholders});


  }



  render() {



let shareIndex = [];
let shareAnswer = [];

    {this.state.shareholders.map((shareholders, shareholdersIndex) =>{
        shareIndex.push(shareholdersIndex),
        shareAnswer.push(shareholders.answer)
    })}



    let exercise_question = [];
    {this.props.exercise_detail.map((exercise,exerciseIndex) => {


        this.props.exerciseQuestion.map((exerciseQuestion,exerciseQuestionIndex) => {


        exercise_question.push(<Col md={6}>
          <Panel>
            <ListGroup>
              <Col md={12}>
                {exerciseQuestionIndex+1}). {exerciseQuestion.question} ({exerciseQuestion.score} คะแนน)
              </Col>
              {exerciseQuestion.exercise_question_choice_id.map((exerciseQuestionChoice,questionChoiceIndex) =>
                <FormGroup>
                  <Col md={12}>
                    <br/>
                    <Radio name={exerciseQuestionIndex} >{exerciseQuestionChoice.choice}</Radio>
                    {console.log(this.state.shareholders)}
                    {console.log(shareIndex)}
                    {console.log(shareAnswer)}
                    {console.log(shareAnswer[questionChoiceIndex])}
                    {console.log(questionChoiceIndex)}
                    {console.log(exerciseQuestionIndex)}

                    </Col>
                </FormGroup>

              )}


              <Col md={3}>
                <br/>
              </Col>
            </ListGroup>
          </Panel>
        </Col>)
        })

    })}


    return (
      <Grid>
        <Row>

          {this.props.exercise_detail.map((exercise) =>
            <Col md={12}>
              <h1>{exercise.name} ({exercise.total_score} คะแนน)</h1>
            </Col>
          )}



        </Row>
        <Row>
          <Form onSubmit={this.saveExerciseQuestion}>
            <Col md={12}>
              <Panel header="คำถาม">
                <Row>
                  {exercise_question}
                </Row>
              </Panel>
              <Button bsStyle="success" block type="submit">ส่งคำตอบ</Button>
              <br/>
            </Col>
          </Form>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(StudentExercise);
