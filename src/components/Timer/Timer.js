import React, { Component } from 'react';
import css from './Timer.module.css';

export default class Timer extends Component {
  render() {
    return (
      <div class={css.info}>
        <p>Round {this.props.round}</p>
        <p>
          {this.props.seconds < 10
            ? this.props.minutes + '  : 0' + this.props.seconds
            : this.props.minutes + '  : ' + this.props.seconds}
        </p>
      </div>
    );
  }
}
