import React, { PropTypes, Component } from 'react';
import { FormattedRelative } from 'react-intl';
import Tag from 'components/Tag';
import Answer from 'components/Answer';
import noAvatar from 'images/noavatar.png';
import EntrySection from 'components/EntrySection';


class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {entrySectionOpen: false};
    this.onDestroy = this.onDestroy.bind(this);
    this.onCreateAnswer = this.onCreateAnswer.bind(this);
    this.entrySectionToggle = this.entrySectionToggle.bind(this);
    this.onIncrementLikeCount = this.onIncrementLikeCount.bind(this);
  }
  onDestroy() {
    const { destroy, q } = this.props;
    if (confirm('Ты действительно хочешь удалить этот шикарный вопрос?')) {
      destroy(q.id);
    }
  }
  onIncrementLikeCount() {
    const { incrementLikeCount, q } = this.props;
    incrementLikeCount(q.id);
  }
  onCreateAnswer(answer) {
    const { createAnswer, q } = this.props;
    createAnswer(q.id, answer);
  }
  entrySectionToggle() {
    this.setState({entrySectionOpen: !this.state.entrySectionOpen});
  }
  render() {
    const {q, user, removeTag, destroyAnswer } = this.props;
    const {entrySectionOpen} = this.state;
    const { id, text, date, tags } = q;
    return (
      <article className="media" key={id}>
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={noAvatar} alt="Без аватара" />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>Анонимус</strong> <small><FormattedRelative value={date} /></small>
              <br />
              {text}
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              {user.permission.reply &&
                <a className="level-item" onClick={this.entrySectionToggle} title={entrySectionOpen ? 'Закрыть поле ответа' : 'Ответить на вопрос'}>
                  <span className="icon is-small">
                    <i className={entrySectionOpen ? 'fa fa-chevron-up' : 'fa fa-reply'} />
                  </span>
                </a>
              }
              <a className="level-item" onClick={this.onIncrementLikeCount}>
                <span className="icon is-small">
                  <i className="fa fa-heart" />
                </span>
                <span>{q.likes.count}</span>
              </a>
              {tags.map((tag, key) => {
                return (
                  <Tag
                    key={key}
                    id={key}
                    qid={id}
                    text={tag}
                    destroy={removeTag}
                    destroyPerm={user.permission.approve}
                  />
                );
              })}
            </div>
          </nav>
          {entrySectionOpen &&
            <EntrySection
              onEntrySave={this.onCreateAnswer}
              placeholder="Введите свой ответ..."
              btnCaption="Ответить"
              userName={user.profile.name}
              avatarSizeClass="is-48x48"
            />
          }
          {q.answers.map((answer) => {
            return (
              <Answer
                key={answer.id}
                qid={id}
                answer={answer}
                destroy={destroyAnswer}
                destroyPerm={user.profile.name === answer.author.name}
              />
            );
          })}
        </div>
        {user.permission.approve &&
          <div className="media-right">
            <button className="delete" title="Удалить вопрос" onClick={this.onDestroy} />
          </div>
        }
      </article>
    );
  }
}

Question.propTypes = {
  q: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  removeTag: PropTypes.func.isRequired,
  incrementLikeCount: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  createAnswer: PropTypes.func.isRequired,
  destroyAnswer: PropTypes.func.isRequired
};

export default Question;
