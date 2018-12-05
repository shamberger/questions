import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { manualLogin } from 'actions/users';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin } = this.props;

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    manualLogin({ email, password });
  }

  render() {
    const { isWaiting, message } = this.props.user;
    return (
      <section className="section">
        <div className="container">
          <p className="title is-3">Авторизация</p>
          <p className="subtitle is-5">Исключительно для руководства фирмы и HR менеджеров.</p>
          {message && message.length > 0 &&
            <div className="notification is-danger">
              {message}
            </div>
          }
          <form onSubmit={this.handleOnSubmit}>
            <div className="control is-grouped">
              <p className="control has-icon is-expanded">
                <input className="input" type="email" ref={c => this.emailInput = c} placeholder="Электропочта" />
                <i className="fa fa-envelope" />
              </p>
              <p className="control has-icon is-expanded">
                <input className="input" type="password" ref={c => this.passwordInput = c} placeholder="Пароль" />
                <i className="fa fa-lock" />
              </p>
              <p className="control">
                <input className={classNames('button', 'is-primary', { 'is-loading': isWaiting })}
                  type="submit"
                  value="Войти"
                />
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
};

function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { manualLogin })(Login);
