import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import QuestionsContainer from 'containers/Questions';

class Questions extends Component {
  render() {
    return (
      <Page {...this.getMetaData()}>
        <QuestionsContainer {...this.props} />
      </Page>
    );
  }

  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Главная | Questions';
  }

  pageMeta() {
    return [
      { name: "description", content: "Вопросы и ответы сотрудников фирмы" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default Questions;
