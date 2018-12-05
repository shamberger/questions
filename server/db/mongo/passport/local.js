import User from '../models/user';

export default (email, password, done) => {
  User.findOne({ email }, (findErr, user) => {
    if (!user) return done(null, false, { message: `Увы, но пользователя с электропочтой "${email}" не найдено.` });
    return user.comparePassword(password, (passErr, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Оопс, неправильно введена Электропочта или Пароль' });
    });
  });
};
