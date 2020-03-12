import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import GameScreen from '../game-screen/game-screen';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player.js';
import {GameType} from '../../const.js';
import PropTypes from 'prop-types';


const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

class App extends React.PureComponent {
  renderGameScreen() {
    const {
      errorsCount,
      questions,
      onAnswer,
      onClickWelcomeButton,
      step,
    } = this.props;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onClickWelcomeButton={onClickWelcomeButton}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}>
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={onAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={onAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderGameScreen()}
          </Route>
          <Route exact path="/dev-artist">
            <GameScreen type={questions[1].type}>
              <ArtistQuestionScreenWrapped
                question={questions[1]}
                onAnswer={() => {}}
              />
            </GameScreen>
          </Route>
          <Route exact path="/dev-genre">
            <GameScreen type={questions[0].type}>
              <GenreQuestionScreenWrapped
                question={questions[0]}
                onAnswer={() => {}}
              />
            </GameScreen>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onClickWelcomeButton: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    step: state.step
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickWelcomeButton() {
      dispatch(ActionCreator.incrementStep());
    },
    onAnswer() {
      dispatch(ActionCreator.incrementStep());
    },
  };
}

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);


