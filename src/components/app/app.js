import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
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
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };

    this.handleWelcomeButtonClick = this.handleWelcomeButtonClick.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  handleWelcomeButtonClick() {
    this.setState({
      step: 0,
    });
  }

  handleAnswerChange() {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }

  renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onClickWelcomeButton={this.handleWelcomeButtonClick}
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
                onAnswer={this.handleAnswerChange}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={this.handleAnswerChange}
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
};

export default App;
