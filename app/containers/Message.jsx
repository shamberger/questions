import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import { dismissMessage } from 'actions/messages';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

const Message = ({message, type, dismissMessage}) => (
  <div>
    {message && message.length > 0 &&
      <section className="hero is-primary">
       <div className="hero-body">
          <div className="container" >
            <div className={classNames('notification', {
              'is-success': type === 'SUCCESS'
            })}>
              {message}
              <button onClick={dismissMessage} className="delete" />
            </div>
          </div>
        </div>
      </section>
    }
  </div>
);

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps, { dismissMessage })(Message);
