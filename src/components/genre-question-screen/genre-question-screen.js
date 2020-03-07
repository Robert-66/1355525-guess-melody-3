import React from 'react';
import PropTypes from 'prop-types';
import {GameType} from '../../const.js';

class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: props.question.answers.map(() => false),
    };

    this.handleInputAnswerChange = this.handleInputAnswerChange.bind(this);
    this.handleFormAnswerSubmit = this.handleFormAnswerSubmit.bind(this);
  }

  handleInputAnswerChange(e, i) {
    const value = e.target.checked;
    let userAnswers = [...this.state.answers];

    this.setState({
      answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
    });
  }

  handleFormAnswerSubmit(e) {
    e.preventDefault();
    this.props.onAnswer(this.props.question, this.state.answers);
  }

  render() {
    const {genre, answers} = this.props.question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={(e) => this.handleFormAnswerSubmit(e)}>
          {answers.map((answer, i) => (
            <div key={`${i}-${answer.src}`} className="track">
              <button className="track__button track__button--play" type="button"/>
              <div className="track__status">
                <audio
                  src={answer.src}
                />
              </div>
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox" name="answer" value={`answer-${i}`}
                  id={`answer-${i}`}
                  checked={this.state.answers[i]}
                  onChange={(e) => this.handleInputAnswerChange(e, i)}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
};

export default GenreQuestionScreen;
