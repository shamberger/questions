import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import noAvatar from 'images/noavatar.png';

export default class EntrySection extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({value: event.target.value});
  }

  onSave() {
    const { onEntrySave } = this.props;
    onEntrySave(this.state.value);
    this.setState({value: ''});
  }

  render() {
    const { placeholder, btnCaption, userName, avatarSizeClass } = this.props;
    return (
      <article className="media">
        <figure className="media-left">
          <p className={classNames('image', avatarSizeClass)}>
            <img src={noAvatar} alt="Без аватара" />
          </p>
        </figure>
        <div className="media-content">
          <label className="label">{userName || 'Анонимус'}</label>
          <p className="control">
            <textarea
              className="textarea"
              onChange={this.onChange}
              value={this.state.value}
              placeholder={placeholder}
            />
          </p>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <a onClick={this.onSave} className="button is-info">{btnCaption}</a>
              </div>
            </div>
          </nav>
        </div>
      </article>
    );
  }
}

EntrySection.PropTypes = {
  onEntrySave: PropTypes.func.isRequired,
  onEntryChange: PropTypes.func.isRequired,
  value: PropTypes.string
};
