import React, { Component } from 'react';
import css from './SoccerGame.module.css';
import firstTeamImage from '../../assets/Team1.jpeg';
import secondTeamImage from '../../assets/Team2.avif';
import ScoreBoard from 'components/ScoreBoard/ScoreBoard';
import Timer from 'components/Timer/Timer';

const ROUNDS_STATE = {
  minutes: 1,
  seconds: 30,
};

export default class SoccerGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTeamFirstRoundScore: 0,
      firstTeamSecondRoundScore: 0,
      secondTeamFirstRoundScore: 0,
      secondTeamSecondRoundScore: 0,
      minutes: 2,
      seconds: 30,
      round: 1,
      pause: false,
    };
  }

  timerId = setInterval(() => {
    var prevNrOfSeconds = this.state.minutes * 60 + this.state.seconds;
    var nextNrOfSeconds = prevNrOfSeconds - 1;
    var nextNrOfMinutes = Math.floor(nextNrOfSeconds / 60);
    while (nextNrOfSeconds >= 60) {
      nextNrOfSeconds = nextNrOfSeconds - 60;
    }
    this.setState({ minutes: nextNrOfMinutes, seconds: nextNrOfSeconds });
  }, 1000);

  timer2Id = setTimeout(() => {
    clearInterval(this.timerId);
  }, 150000);

  timer3Id = setInterval(() => {
    var x = Math.random() * 2;
    if (x > 0 && x < 1) {
      this.setState(prevState => ({
        firstTeamFirstRoundScore: prevState.firstTeamFirstRoundScore + 1,
      }));
    } else {
      this.setState(prevState => ({
        secondTeamFirstRoundScore: prevState.secondTeamFirstRoundScore + 1,
      }));
    }
  }, 15000);

  timer4Id = setTimeout(() => {
    clearInterval(this.timer3Id);
  }, 150000);

  render() {
    return (
      <div class={css.board}>
        <img src={firstTeamImage} width="200" height="200"></img>
        <Timer
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          round={this.state.round}
          pause={this.state.pause}
        ></Timer>
        <ScoreBoard
          firstTeamFirstRoundScore={this.state.firstTeamFirstRoundScore}
          secondTeamFirstRoundScore={this.state.secondTeamFirstRoundScore}
          firstTeamSecondRoundScore={this.state.firstTeamSecondRoundScore}
          secondTeamSecondRoundScore={this.state.secondTeamSecondRoundScore}
        ></ScoreBoard>
        <img src={secondTeamImage} width="200" height="200"></img>
      </div>
    );
  }
}
