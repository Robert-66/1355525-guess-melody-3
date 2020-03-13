import {extend} from './utils';
import {GameType} from './const';
import questions from './mocks/questions';
import settings from './mocks/settings.js';

const initialState = {
  errors: 0,
  maxErrors: settings.ERRORS_COUNT,
  step: -1,
  questions,
};

const ActionType = {
  INCREMENT_ERRORS: `INCREMENT_ERRORS`,
  INCREMENT_STEP: `INCREMENT_STEP`,
};

const isArtistAnswerCorrect = (question, userAnswer) => userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  userAnswer: (question, userAnswer) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_STEP,
      payload: answerIsCorrect ? 1 : 0,
    };
  },
  incrementError: (question, userAnswer) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_ERRORS,
      payload: answerIsCorrect ? 0 : 1,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      let nextStep = state.step + action.payload;

      if (nextStep >= state.questions.length) {
        return initialState;
      }

      return extend(state, {
        step: nextStep,
      });

    case ActionType.INCREMENT_ERRORS:
      const errors = state.errors + action.payload;

      if (errors >= state.maxErrors) {
        return initialState;
      }

      return extend(state, {
        errors: state.errors + action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
