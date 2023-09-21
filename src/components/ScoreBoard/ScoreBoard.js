import React, { Component } from 'react';
import css from './ScoreBoard.module.css';

export default class ScoreBoard extends Component {
  render() {
    var s11 = this.props.firstTeamFirstRoundScore;
    var s12 = this.props.secondTeamFirstRoundScore;
    var s21 = this.props.firstTeamSecondRoundScore;
    var s22 = this.props.secondTeamSecondRoundScore;
    return (
      <div class={css.scoreBoard}>
        <div class={css.scoreBoardComponent}>
          <span>{s11}</span>
          <span>1ST</span>
          <span>{s12}</span>
        </div>
        <div class={css.scoreBoardComponent}>
          <span>{s21}</span>
          <span>2ND</span>
          <span>{s22}</span>
        </div>
        <div class={css.line}></div>
        <div class={css.scoreBoardComponent}>
          <span>
            {this.props.firstTeamGoldenGoal ? s11 + s21 + 1 : s11 + s21}
          </span>
          <span>TOTAL</span>
          <span>
            {this.props.secondTeamGoldenGoal ? s12 + s22 + 1 : s12 + s22}
          </span>
        </div>
      </div>
    );
  }
}
