import React, { PropTypes, Component } from 'react';
import { FormattedRelative } from 'react-intl';
import noAvatar from 'images/noavatar.png';

const Answer = ({ qid, answer, destroy, destroyPerm }) => {
    const {id, text, date, author} = answer;
    const onDestroy = () => {
      destroy(qid, id);
    };
    return (
      <article className="media" key={id}>
        <figure className="media-left">
          <p className="image is-48x48">
            <img src={noAvatar} alt="Без аватара" />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{author.name}</strong><small>@{author.description} <FormattedRelative value={date} /></small>
              <br />
              {text}
            </p>
          </div>
        </div>
        {destroyPerm &&
          <div className="media-right">
            <button className="delete" onClick={onDestroy} title="Удалить ответ" />
          </div>
        }
      </article>
    );
};

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  destroy: PropTypes.func.isRequired
};

export default Answer;
