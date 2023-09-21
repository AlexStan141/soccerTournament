import React, { Component } from 'react';
import css from './SoccerGame.module.css';
import firstTeamImage from '../../assets/Team1.jpeg';
import secondTeamImage from '../../assets/Team2.avif';
import ScoreBoard from 'components/ScoreBoard/ScoreBoard';
import Timer from 'components/Timer/Timer';

const ROUND_DURATION = {
  minutes: 2,
  seconds: 30,
};

const PAUSE_DURATION = {
  minutes: 1,
  seconds: 0,
};

const GOLDEN_GOAL_ROUND_DURATION = {
  minutes: 0,
  seconds: 15,
};

export default class SoccerGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTeamFirstRoundScore: 0,
      firstTeamSecondRoundScore: 0,
      firstTeamGoldenGoal: false,
      secondTeamFirstRoundScore: 0,
      secondTeamSecondRoundScore: 0,
      secondTeamGoldenGoal: false,
      minutes: ROUND_DURATION.minutes,
      seconds: ROUND_DURATION.seconds,
      phase: 'ROUND 1',
    };
  }

  manageFirstRoundTime = setInterval(() => {
    if (this.state.phase === 'ROUND 1') {
      var prevNrOfSeconds = this.state.minutes * 60 + this.state.seconds;
      var nextNrOfSeconds = prevNrOfSeconds - 1;
      var nextNrOfMinutes = Math.floor(nextNrOfSeconds / 60);
      while (nextNrOfSeconds >= 60) {
        nextNrOfSeconds = nextNrOfSeconds - 60;
      }
      this.setState({ minutes: nextNrOfMinutes, seconds: nextNrOfSeconds });
      if (nextNrOfMinutes === 0 && nextNrOfSeconds === 0) {
        clearInterval(this.manageFirstRoundTime);
        clearInterval(this.manageFirstRoundGoals);
        this.setState({
          minutes: PAUSE_DURATION.minutes,
          seconds: PAUSE_DURATION.seconds,
          phase: 'PAUSE',
        });
      }
    }
  }, 1000);

  manageFirstRoundGoals = setInterval(() => {
    if (this.state.phase === 'ROUND 1') {
      var x = Math.random() * 2;
      if (x >= 0 && x < 1) {
        this.setState(prevState => ({
          firstTeamFirstRoundScore: prevState.firstTeamFirstRoundScore + 1,
        }));
      } else {
        this.setState(prevState => ({
          secondTeamFirstRoundScore: prevState.secondTeamFirstRoundScore + 1,
        }));
      }
    }
  }, 15000);

  managePauseTime = setInterval(() => {
    if (this.state.phase === 'PAUSE') {
      var prevNrOfSeconds = this.state.minutes * 60 + this.state.seconds;
      var nextNrOfSeconds = prevNrOfSeconds - 1;
      var nextNrOfMinutes = Math.floor(nextNrOfSeconds / 60);
      while (nextNrOfSeconds >= 60) {
        nextNrOfSeconds = nextNrOfSeconds - 60;
      }
      this.setState({ minutes: nextNrOfMinutes, seconds: nextNrOfSeconds });
      if (nextNrOfMinutes === 0 && nextNrOfSeconds === 0) {
        clearInterval(this.managePauseTime);
        this.setState({
          minutes: ROUND_DURATION.minutes,
          seconds: ROUND_DURATION.seconds,
          phase: 'ROUND 2',
        });
      }
    }
  }, 1000);

  manageSecondRoundTime = setInterval(() => {
    if (this.state.phase === 'ROUND 2') {
      var prevNrOfSeconds = this.state.minutes * 60 + this.state.seconds;
      var nextNrOfSeconds = prevNrOfSeconds - 1;
      var nextNrOfMinutes = Math.floor(nextNrOfSeconds / 60);
      while (nextNrOfSeconds >= 60) {
        nextNrOfSeconds = nextNrOfSeconds - 60;
      }
      this.setState({ minutes: nextNrOfMinutes, seconds: nextNrOfSeconds });
      if (nextNrOfMinutes === 0 && nextNrOfSeconds === 0) {
        clearInterval(this.manageSecondRoundTime);
        clearInterval(this.manageSecondRoundGoals);
        var firstTeamScore =
          this.state.firstTeamFirstRoundScore +
          this.state.firstTeamSecondRoundScore;
        var secondTeamScore =
          this.state.secondTeamFirstRoundScore +
          this.state.secondTeamSecondRoundScore;
        if (firstTeamScore === secondTeamScore) {
          this.setState({
            minutes: GOLDEN_GOAL_ROUND_DURATION.minutes,
            seconds: GOLDEN_GOAL_ROUND_DURATION.seconds,
            phase: 'GOLDEN GOAL',
          });
        }
      }
    }
  }, 1000);

  manageSecondRoundGoals = setInterval(() => {
    if (this.state.phase === 'ROUND 2') {
      var x = Math.random() * 2;
      if (x >= 0 && x < 1) {
        this.setState(prevState => ({
          firstTeamSecondRoundScore: prevState.firstTeamSecondRoundScore + 1,
        }));
      } else {
        this.setState(prevState => ({
          secondTeamSecondRoundScore: prevState.secondTeamSecondRoundScore + 1,
        }));
      }
    }
  }, 15000);

  manageGoldenGoalRoundTime = setInterval(() => {
    if (this.state.phase === 'GOLDEN GOAL') {
      var prevNrOfSeconds = this.state.minutes * 60 + this.state.seconds;
      var nextNrOfSeconds = prevNrOfSeconds - 1;
      var nextNrOfMinutes = Math.floor(nextNrOfSeconds / 60);
      while (nextNrOfSeconds >= 60) {
        nextNrOfSeconds = nextNrOfSeconds - 60;
      }
      this.setState({ minutes: nextNrOfMinutes, seconds: nextNrOfSeconds });
      if (nextNrOfMinutes === 0 && nextNrOfSeconds === 0) {
        var x = Math.random() * 2;
        if (x >= 0 && x < 1) {
          this.setState({ firstTeamGoldenGoal: true });
        } else {
          this.setState({ secondTeamGoldenGoal: true });
        }
        clearInterval(this.manageGoldenGoalRoundTime);
      }
    }
  }, 1000);

  render() {
    return (
      <div class={css.background}>
        <div class={css.board}>
          <img
            src={firstTeamImage}
            alt="First Team Logo"
            width="200"
            height="200"
          ></img>
          <Timer
            minutes={this.state.minutes}
            seconds={this.state.seconds}
            phase={this.state.phase}
          ></Timer>
          <ScoreBoard
            firstTeamFirstRoundScore={this.state.firstTeamFirstRoundScore}
            secondTeamFirstRoundScore={this.state.secondTeamFirstRoundScore}
            firstTeamSecondRoundScore={this.state.firstTeamSecondRoundScore}
            secondTeamSecondRoundScore={this.state.secondTeamSecondRoundScore}
            firstTeamGoldenGoal={this.state.firstTeamGoldenGoal}
            secondTeamGoldenGoal={this.state.secondTeamGoldenGoal}
          ></ScoreBoard>
          <img
            src={secondTeamImage}
            alt="Second Team Logo"
            width="200"
            height="200"
          ></img>
        </div>
      </div>
    );
  }
}
