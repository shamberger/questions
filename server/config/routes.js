/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const questionsController = controllers && controllers.questions;
const answersController = controllers && controllers.answers;
const countsController = controllers && controllers.counts;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    //app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  if (answersController) {
    app.post('/answer/:qid', answersController.add);
    app.delete('/answer/:id', answersController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  if (countsController) {
    app.get('/counts', countsController.all);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  if (questionsController) {
    app.get('/question/:sort?*', questionsController.all);
    app.post('/question/:id', questionsController.add);
    app.put('/question/:id', questionsController.update);
    app.delete('/question/:id', questionsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }
};
