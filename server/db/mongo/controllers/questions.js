import _ from 'lodash';
import Question from '../models/questions';

/**
 * List
 */
export function all(req, res) {
  const findOptions = (!req.isAuthenticated() || !req.user.permission.approve) ? {tags: {$nin: ['не проверен'] }} : {};
  const sortOptions = {date: 'desc'}
  Question.find(findOptions).sort(sortOptions).exec((err, questions) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(questions);
  });
}

export function add(req, res) {
  Question.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

export function update(req, res) {
  const query = { id: req.params.id };
  const isIncrement = req.body.isIncrement;
  const removeTag = req.body.removeTag;
  const isFull = req.body.isFull;
  const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull', 'removeTag'];
  const data = _.omit(req.body, omitKeys);

  if (isFull) {
    Question.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  }

  if (isIncrement) {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const IncrementQuery = { id: req.params.id, 'likes.ip': {$nin: [clientIp] } };
    Question.findOneAndUpdate(IncrementQuery, {
        $inc: { 'likes.count': 1 },
        $push: { 'likes.ip': clientIp}
      }, (err, question) => {
        if (err) {
          console.log('Error on save!', err);
          return res.status(500).send('We failed to save for some reason');
        }
        if (!question) {
          return res.status(304).send('This user has voted');
        }
        return res.status(200).send('Updated successfully');
    });
  }

  if (removeTag) {
   Question.findOneAndUpdate(query, { $pull: { tags: removeTag } }, (err) => {
     if (err) {
       console.log('Error on save!');
       return res.status(500).send('We failed to save for some reason');
     }

     return res.status(200).send('Updated successfully');
   });
 }
}

export function remove(req, res) {
  if (!req.isAuthenticated() || !req.user.permission.approve) {
    return res.status(403).send('Ах, ты, шалунишка!');
  }
  const query = { id: req.params.id };
  Question.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  update,
  remove
};
