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
import s from './exerciseQuestion.css';
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

class Exercise extends React.Component {
  static propTypes = {
    exercise_ID: PropTypes.string.isRequired,
    exercise_detail: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    lastQuestion: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      shareholders: [{question: '',choiceA:'', choiceB:'', choiceC:'', choiceD:'',answer:'', score:''}],
    };
    this.props.exercise_detail.map((exercise) => {
    for(var i = 0; i < exercise.amount - 1; i ++) {
      this.setState({
        shareholders: this.state.shareholders.push({question: '',choiceA:'', choiceB:'', choiceC:'', choiceD:'',answer:'', score:''}),
      });

    }
    })

  }

  handleShareholderQuestionChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;

      return {...shareholder, question: evt.target.value};
    });

    this.setState({shareholders: newShareholders});


  }

  handleShareholderChoiceAChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;

      return {...shareholder, choiceA: evt.target.value};
    });

    this.setState({shareholders: newShareholders});


  }
  handleShareholderChoiceBChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;

      return {...shareholder, choiceB: evt.target.value};
    });

    this.setState({shareholders: newShareholders});


  }

  handleShareholderChoiceCChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;

      return {...shareholder, choiceC: evt.target.value};
    });

    this.setState({shareholders: newShareholders});


  }

  handleShareholderChoiceDChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;

      return {...shareholder, choiceD: evt.target.value};
    });

    this.setState({shareholders: newShareholders});


  }

  handleShareholderAnswerChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;

      return {...shareholder, answer: evt.target.value};
    });

    this.setState({shareholders: newShareholders});


  }

  handleShareholderScoreChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;

      return {...shareholder, score: evt.target.value};
    });

    this.setState({shareholders: newShareholders});


  }

async mutationExercise(){

  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: 'mutation{exerciseQuestionCreate(exercise_id:' + this.props.exercise_ID + ',question:"' + shareholders.question + '",score:' + shareholders.score + '){id}}',
    }),
  });

}




  saveExerciseQuestion = event =>{

    // this.props.exercise_detail.map((exercise) => {
    //
    //   for(let i = 0; i < exercise.amount ; i ++) {
    //
    //     this.state.shareholders.map(async (shareholders, shareIndex) => {
    //
    //       if(i === shareIndex) {
    //
    //         if (shareholders.question != "" && shareholders.score != "" && shareholders.choiceA != "" && shareholders.choiceB != "" && shareholders.choiceC != "" && shareholders.choiceD != "" && shareholders.answer != "") {
    //
    //           fetch('/graphql', {
    //             method: 'post',
    //             headers: {
    //               Accept: 'application/json',
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //               query: 'mutation{exerciseQuestionLatest(exercise_id:' + this.props.exercise_ID + '){id}}',
    //             }),
    //           });
    //
    //           alert("mutation finish"+i);
    //
    //           const resp = await fetch('/graphql', {
    //             method: 'post',
    //             headers: {
    //               Accept: 'application/json',
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //               query: 'query{exerciseQuestionLatest(exercise_id:' + this.props.exercise_ID + '){id}}',
    //             }),
    //           });
    //           const {data} = await resp.json();
    //           const latestRecord = await data.exerciseQuestionLatest;
    //
    //           alert("query finish"+i);
    //
    //           latestRecord.map(async (latestRecord) => {
    //             this.setState({lastestRecordID: latestRecord.id});
    //             alert(shareIndex);
    //             alert(this.state.lastestRecordID);
    //           })


              // fetch('/graphql', {
              //   method: 'POST',
              //   headers: {
              //     'Accept': 'application/json',
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify({
              //     query: 'mutation{exerciseQuestionChoiceACreate(exercise_question_id:' + this.state.lastestRecordID + ',choice:"' + shareholders.choiceA + '",status:"RIGHT"){id}}',
              //   }),
              // });
              // fetch('/graphql', {
              //   method: 'POST',
              //   headers: {
              //     'Accept': 'application/json',
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify({
              //     query: 'mutation{exerciseQuestionChoiceBCreate(exercise_question_id:' + this.state.lastestRecordID + ',choice:"' + shareholders.choiceB + '",status:"WRONG"){id}}',
              //   }),
              // });
              // fetch('/graphql', {
              //   method: 'POST',
              //   headers: {
              //     'Accept': 'application/json',
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify({
              //     query: 'mutation{exerciseQuestionChoiceCCreate(exercise_question_id:' + this.state.lastestRecordID + ',choice:"' + shareholders.choiceC + '",status:"WRONG"){id}}',
              //   }),
              // });
              // fetch('/graphql', {
              //   method: 'POST',
              //   headers: {
              //     'Accept': 'application/json',
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify({
              //     query: 'mutation{exerciseQuestionChoiceDCreate(exercise_question_id:' + this.state.lastestRecordID + ',choice:"' + shareholders.choiceD + '",status:"WRONG"){id}}',
              //   }),
              // });


              // if(shareholders.answer == "2") {
              //
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceACreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceA + '",status:"WRONG"){id}}',
              //     })
              //   })
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceBCreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceB + '",status:"RIGHT"){id}}',
              //     })
              //   })
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceCCreate(exercise_question_id:' +this.state.latestRecordID + ',choice:"' + shareholders.choiceC + '",status:"WRONG"){id}}',
              //     })
              //   })
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceDCreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceD + '",status:"WRONG"){id}}',
              //     })
              //   })
              // }
              // if(shareholders.answer == "3") {
              //
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceACreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceA + '",status:"WRONG"){id}}',
              //     })
              //   })
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceBCreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceB + '",status:"WRONG"){id}}',
              //     })
              //   })
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceCCreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceC + '",status:"RIGHT"){id}}',
              //     })
              //   })
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceDCreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceD + '",status:"WRONG"){id}}',
              //     })
              //   })
              // }
              // if(shareholders.answer == "4") {
              //
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceACreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceA + '",status:"WRONG"){id}}',
              //     })
              //   })
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceBCreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceB + '",status:"WRONG"){id}}',
              //     })
              //   })
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceCCreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceC + '",status:"WRONG"){id}}',
              //     })
              //   })
              //   fetch('/graphql', {
              //     method: 'POST',
              //     headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({
              //       query: 'mutation{exerciseQuestionChoiceDCreate(exercise_question_id:' + this.state.latestRecordID + ',choice:"' + shareholders.choiceD + '",status:"RIGHT"){id}}',
              //     })
              //   })
              // }
      //       }
      //     }
      //   })
      // }
      // })

}


  render() {



    let exercise_question = [];
    {this.props.exercise_detail.map((exercise,index) => {

      for (var i = 0; i < exercise.amount; i++) {
        exercise_question.push(<Col md={6}>
          <Panel>
            <ListGroup>
                <Col md={10}>
                  <ControlLabel>คำถามข้อที่ {i+1}</ControlLabel>
                </Col>
              <Col md={2}>
                <ControlLabel>คะแนน</ControlLabel>
              </Col>
                <Col md={10}>
                  <FormControl type="text" onChange={this.handleShareholderQuestionChange(i)} />
                </Col>
              <Col md={2}>
                <FormControl type="number" onChange={this.handleShareholderScoreChange(i)}/>
              </Col>

                <Col md={6}>
                  <br/>
                  <FormControl type="text" placeholder="ก." onChange={this.handleShareholderChoiceAChange(i)}/>
                </Col>
                <Col md={6}>
                  <br/>
                  <FormControl type="text" placeholder="ข." onChange={this.handleShareholderChoiceBChange(i)}/>
                </Col>
                <Col md={6}>
                  <br/>
                  <FormControl type="text" placeholder="ค." onChange={this.handleShareholderChoiceCChange(i)}/>
                </Col>
                <Col md={6}>
                  <br/>
                  <FormControl type="text" placeholder="ง." onChange={this.handleShareholderChoiceDChange(i)}/>
                </Col>
                <Col md={3}>
                  <br/>
                  <FormControl componentClass="select" onChange={this.handleShareholderAnswerChange(i)}>
                    <option selected>คำตอบ*</option>
                    <option value="1">ก.</option>
                    <option value="2">ข.</option>
                    <option value="3">ค.</option>
                    <option value="4">ง.</option>
                  </FormControl>
                </Col>
            </ListGroup>
          </Panel>
        </Col>)
      }
    })}

    console.log(this.state.shareholders);

    return (
      <Grid>
        <Row>

          {this.props.exercise_detail.map((exercise) =>
          <Col md={12}>
            <h1>{exercise.name}</h1>
          </Col>
          )}



        </Row>
        <Row>
          <Form onSubmit={this.saveExerciseQuestion}>
          <Col md={12}>
            <Panel header="สร้างคำถามและตัวเลือก">
              <Row>
                {exercise_question}
              </Row>
            </Panel>
            <Button bsStyle="success" block type="submit">บันทึกคำถามและตัวเลือก</Button>
            <br/>
          </Col>
          </Form>
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(Exercise);
