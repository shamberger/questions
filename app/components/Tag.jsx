import React, { PropTypes } from 'react';

const Tag = ({ text, id, qid, destroy, destroyPerm }) => {
  const onDestroy = () => {
    destroy(qid, text);
  };

  return (
    <span className="tag is-small" key={id}>
      {text}
      {destroyPerm &&
        <button onClick={onDestroy} className="delete is-small" title="Удалить метку" />
      }
    </span>
  );
};

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  qid: PropTypes.string.isRequired,
  destroyPerm: PropTypes.bool.isRequired,
  destroy: PropTypes.func.isRequired
};

export default Tag;
