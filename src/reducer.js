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
  USER_ANSWER: `USER_ANSWER`,
};

const isArtistAnswerCorrect = (question, userAnswer) => userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const answerIsCorrect = (state, {question, userAnswer}) => {
  let isCorrect = false;

  switch (question.type) {
    case GameType.ARTIST:
      isCorrect = isArtistAnswerCorrect(question, userAnswer);
      break;
    case GameType.GENRE:
      isCorrect = isGenreAnswerCorrect(question, userAnswer);
      break;
  }

  return isCorrect;
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  userAnswer: (question, userAnswer) => {
    return {
      type: ActionType.USER_ANSWER,
      payload: {question, userAnswer},
    };
  },
  incrementError: (question, userAnswer) => {
    return {
      type: ActionType.INCREMENT_ERRORS,
      payload: {question, userAnswer},
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
      if (!answerIsCorrect(state, action.payload) && state.errors + 1 >= state.maxErrors) {
        return initialState;
      }

      return extend(state, {
        errors: answerIsCorrect(state, action.payload) ? state.errors : state.errors + 1,
      });

    case ActionType.USER_ANSWER:
      if (answerIsCorrect(state, action.payload) && state.step + 1 >= state.questions.length) {
        return initialState;
      }

      return extend(state, {
        step: answerIsCorrect(state, action.payload) ? state.step + 1 : state.step,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};

