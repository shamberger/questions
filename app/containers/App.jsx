import React, { PropTypes } from 'react';
import Hero from 'containers/Hero';
import Footer from 'components/Footer';
import Message from 'containers/Message';
import {addLocaleData, IntlProvider} from 'react-intl';
import ruLocaleData from 'react-intl/locale-data/ru';
import styles from 'css/main';

addLocaleData(ruLocaleData);

const App = ({children}) => {
  return (
    <IntlProvider locale="ru">
      <div>
        <Hero />
        <Message />
        {children}
        <Footer />
      </div>
    </IntlProvider>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
