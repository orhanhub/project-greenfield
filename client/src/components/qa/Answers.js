import React, { Fragment } from 'react';
import Answer from './Answer';
import axios from 'axios';
import { Button } from '@material-ui/core';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answers: [], load: 2 };
    this.getAnswers = this.getAnswers.bind(this);
    this.loadMore = this.loadMore.bind(this);
    // this.collapesAnswers = this.collapesAnswers.bind(this);
    this.voteAnswer = this.voteAnswer.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }
  componentDidMount() {
    this.getAnswers();
  }

  loadMore() {
    this.setState({
      load: this.state.load + 2
    });
  }
  resetAnswers() {
    this.setState({
      load: 2
    });
  }

  getAnswers(page = 1, count = 50) {
    axios
      .get(
        `http://18.217.220.129/qa/${this.props.question_id}/answers?page=${page}&count=${count}`
      )
      .then(data => {
        this.setState({ answers: data.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }
  voteAnswer(answer_id) {
    axios
      .put(`http://18.217.220.129/qa/answer/${answer_id}/helpful`)
      .then(res => {
        this.getAnswers();
      })
      .catch(err => {
        console.log(err);
      });
  }
  reportAnswer(answer_id) {
    axios
      .put(`http://18.217.220.129/qa/answer/${answer_id}/report`)
      .then(res => {
        this.getAnswers();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.answers.length > 0) {
      return (
        <div className='answerContainer'>
          {this.state.answers.map((answer, index) => {
            if (index < this.state.load) {
              return (
                <Answer
                  answer={answer}
                  key={index}
                  voteAnswer={this.voteAnswer}
                  reportAnswer={this.reportAnswer}
                />
              );
            }
          })}

          {this.state.load < this.state.answers.length ? (
            <Button
              variant='text'
              className='loadmore'
              onClick={() => {
                this.loadMore();
              }}>
              Load more answers
            </Button>
          ) : this.state.load > 2 ? (
            <Button
              variant='text'
              className='loadmore'
              onClick={() => {
                this.reset();
              }}>
              Collapse answers
            </Button>
          ) : (
            <Fragment />
          )}
        </div>
      );
    } else {
      return <div>There's no answer for this question yet.</div>;
    }
  }
}

export default Answers;
