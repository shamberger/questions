import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchVoteData, fetchQuestionData, fetchCountData, fetchAuthUserData } from 'fetch-data';
import { App, Vote, Dashboard, Questions, Login } from 'pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App} fetchData={fetchCountData}>
      <IndexRoute component={Questions} fetchData={fetchQuestionData} />
      <Route path="login" component={Login} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="votee" component={Vote} fetchData={fetchVoteData} />
    </Route>
  );
};
