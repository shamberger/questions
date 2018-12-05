
import Question from '../models/questions';

export function add(req, res) {
  if (!req.isAuthenticated() || !req.user.permission.reply) {
    return res.status(403).send('Ах, ты, шалунишка!');
  }
  const query = { id: req.params.qid };
  const answer = {...req.body,
    date: new Date().toISOString(),
    author: {
      name: req.user.profile.name,
      description: req.user.profile.description
    }
  };
  Question.findOneAndUpdate(query, {$push: {answers: answer}}, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

export function remove(req, res) {

  if (!req.isAuthenticated()) {
    return res.status(403).send('Ах, ты, шалунишка!');
  }

  const query = {'answers.id': req.params.id, 'answers.author.name': req.user.profile.name};

  Question.findOneAndUpdate(query, {$pull: {answers: { id: req.params.id } } }, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  add,
  remove
};
