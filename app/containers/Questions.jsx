import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Question from 'components/Question';
import EntrySection from 'components/EntrySection';
import { createQuestion, typing, removeTag, incrementLikeCount, destroyQuestion } from 'actions/questions';
import { createAnswer, destroyAnswer } from 'actions/answers';
import { NEW, TOP, ONLY_ANSWERS } from '../constants/QuestionsSorting';

const SORTING_TITLES = {
  [NEW]: 'Новые',
  [TOP]: 'Топовые'
};

class Questions extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { sorting: NEW };
  }
  onShow(sorting) {
    this.setState({ sorting });
  }

  sortQuestions(questions) {
    switch (this.state.sorting) {
      case NEW:
        return questions.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      case TOP:
        return questions.sort((a, b) => {
          return b.likes.count - a.likes.count;
        });
      default:
        return questions;
    }
  }
  render() {
    const {
      questions,
      createQuestion,
      removeTag,
      incrementLikeCount,
      user,
      destroyQuestion,
      createAnswer,
      destroyAnswer
    } = this.props;
    const sortedQuestions = this.sortQuestions(questions);
    return (
      <div>
        <nav className="nav has-shadow">
          <div className="container">
            <div className="nav-left">
              {[NEW, TOP].map(sorting =>
                <a
                  key={sorting}
                  className={classNames('nav-item is-tab', { 'is-active': sorting === this.state.sorting })}
                  onClick={() => this.onShow(sorting)}
                >
                  {SORTING_TITLES[sorting]}
                </a>
               )}
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <EntrySection
              onEntrySave={createQuestion}
              placeholder="Введите свой вопрос..."
              btnCaption="Задать вопрос"
              avatarSizeClass="is-64x64"
            />
            {sortedQuestions.map((question) => {
              return (
                <Question
                  key={question.id}
                  q={question}
                  user={user}
                  destroy={destroyQuestion}
                  removeTag={removeTag}
                  incrementLikeCount={incrementLikeCount}
                  createAnswer={createAnswer}
                  destroyAnswer={destroyAnswer}
                />
              );
            })}
          </div>
        </section>
      </div>
    );
  }

}

Questions.propTypes = {
  questions: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  createQuestion: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired,
  incrementLikeCount: PropTypes.func.isRequired,
  destroyQuestion: PropTypes.func.isRequired,
  destroyAnswer: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    questions: state.question.questions,
    user: state.user
  };
}

export default connect(mapStateToProps, { createQuestion, createAnswer, typing, removeTag, incrementLikeCount, destroyQuestion, destroyAnswer })(Questions);
