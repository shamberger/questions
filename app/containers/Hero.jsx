import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

const Hero = ({ counts ,user, logOut }) => {
    return (
      <section className="hero is-primary">
        <div className="hero-head">
          <div className="container">
            <nav className="nav" role="navigation">
              <div className="nav-left">
                <IndexLink className="nav-item is-brand" to="/">
                  <h4 className="title is-5">Questions</h4>
                </IndexLink>
              </div>

              <div className="nav-right nav-menu">
                {user.authenticated ? (
                  <span className="nav-item">
                    <Link onClick={logOut}className="button is-light is-outlined" to="/">
                      <span className="icon">
                        <i className="fa fa-sign-out" />
                      </span>
                      <span>
                        Выйти ({user.profile.name})
                      </span>
                    </Link>
                  </span>
                  ) : (
                    <Link className="nav-item" to="/login" activeClassName="is-active">Авторизация</Link>
                  )}
              </div>
            </nav>
          </div>
        </div>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentred">
              <div className="column">
                <p className="title">У тебя есть вопрос руководству &#063; </p>
                <p className="subtitle">Задай его нашей фирме <strong>анонимно</strong>, и ты обязательно получишь ответ или даже несколько.</p>
              </div>
              <div className="column">
                <nav className="level">
                  <div className="level-item has-text-centered">
                    <p className="heading">Вопросов</p>
                    <p className="title">{counts.questions}</p>
                  </div>
                  <div className="level-item has-text-centered">
                    <p className="heading">Ответов</p>
                    <p className="title">{counts.answers}</p>
                  </div>
                  <div className="level-item has-text-centered">
                    <p className="heading">Лайков</p>
                    <p className="title">{counts.likes}</p>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

Hero.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    counts: state.count.counts,
  };
}

export default connect(mapStateToProps, { logOut })(Hero);
