import Question from '../models/questions';

export function all(req, res) {
  Question.aggregate({
    $group: {
      _id: 'counts',
      likes: { $sum: '$likes.count' },
      answers: { $sum: {$size: '$answers'}},
      questions: { $sum: 1 }
    }
  }).exec((err, counts) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
     return res.json({ questions: counts[0].questions, answers: counts[0].answers, likes: counts[0].likes });
  });
}

export default {
  all
};
