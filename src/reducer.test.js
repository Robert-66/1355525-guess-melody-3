import {reducer, ActionCreator, ActionType} from './reducer';

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/1`,
      artist: `John Snow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/2`,
      artist: `Jack Daniels`,
    }, {
      picture: `https://api.adorable.io/avatars/128/3`,
      artist: `Jim Beam`,
    }],
  },
];

describe(`Reducer work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      errors: 0,
      maxErrors: 3,
      questions,
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      errors: 0,
      questions,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    })).toEqual({
      step: 0,
      errors: 0,
      questions,
    });

    expect(reducer({
      step: -1,
      errors: 0,
      questions,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 0,
    })).toEqual({
      step: -1,
      errors: 0,
      questions,
    });
  });

  it(`Reducer should increment current step by 1 if the user answer for artist is correct`, () => {
    expect(reducer({
      step: 0,
      errors: 0,
      questions,
    }, {
      type: ActionType.USER_ANSWER,
      payload: {
        question: {
          type: `artist`,
          song: {
            artist: `correct`,
            src: ``,
          },
          answers: [
            {
              artist: `correct`,
              picture: ``,
            }, {
              artist: `incorrect`,
              picture: ``,
            }, {
              artist: `incorrect-2`,
              picture: ``,
            },
          ]
        },
        userAnswer: {
          artist: `correct`,
          picture: ``,
        }
      }
    })).toEqual({
      step: 1,
      errors: 0,
      questions,
    });
  });

  it(`Reducer should increment current step by 0 if the user answer for artist is incorrect`, () => {
    expect(reducer({
      step: 0,
      errors: 0,
      questions,
    }, {
      type: ActionType.USER_ANSWER,
      payload: {
        question: {
          type: `artist`,
          song: {
            artist: `correct`,
            src: ``,
          },
          answers: [
            {
              artist: `correct`,
              picture: ``,
            }, {
              artist: `incorrect`,
              picture: ``,
            }, {
              artist: `incorrect-2`,
              picture: ``,
            },
          ]
        },
        userAnswer: {
          artist: `incorrect`,
          picture: ``,
        }
      }
    })).toEqual({
      step: 0,
      errors: 0,
      questions,
    });
  });

  it(`Reducer should increment current step by 1 if the user answer for genre is correct`, () => {
    expect(reducer({
      step: 0,
      errors: 0,
      questions,
    }, {
      type: ActionType.USER_ANSWER,
      payload: {
        question: {
          type: `genre`,
          genre: `jazz`,
          answers: [
            {
              genre: `rock`,
              src: ``,
            }, {
              genre: `jazz`,
              src: ``,
            }, {
              genre: `blues`,
              src: ``,
            }, {
              genre: `blues`,
              src: ``,
            },
          ]
        },
        userAnswer: [false, true, false, false]
      }
    })).toEqual({
      step: 1,
      errors: 0,
      questions,
    });
  });

  it(`Reducer should increment current step by 0 if the user answer for genre is incorrect`, () => {
    expect(reducer({
      step: 0,
      errors: 0,
      questions,
    }, {
      type: ActionType.USER_ANSWER,
      payload: {
        question: {
          type: `genre`,
          genre: `jazz`,
          answers: [
            {
              genre: `rock`,
              src: ``,
            }, {
              genre: `jazz`,
              src: ``,
            }, {
              genre: `blues`,
              src: ``,
            }, {
              genre: `blues`,
              src: ``,
            },
          ]
        },
        userAnswer: [false, false, false, true]
      }
    })).toEqual({
      step: 0,
      errors: 0,
      questions,
    });
  });
});

describe(`Action creators work correctly`, () => {

  const question = {
    type: `artist`,
    song: {
      artist: `correct`,
      src: ``,
    },
    answers: [
      {
        artist: `correct`,
        picture: ``,
      }, {
        artist: `incorrect`,
        picture: ``,
      }, {
        artist: `incorrect-2`,
        picture: ``,
      },
    ]
  };
  const userAnswer = {
    artist: `correct`,
    picture: ``,
  };

  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`Action creator for incrementing errors returns correct action`, () => {
    expect(ActionCreator
      .incrementError(question, userAnswer))
      .toEqual({
        type: ActionType.INCREMENT_ERRORS,
        payload: {
          question,
          userAnswer,
        }
      });
  });

  it(`Action creator for user answer returns correct action`, () => {
    expect(ActionCreator
      .userAnswer(question, userAnswer))
      .toEqual({
        type: ActionType.USER_ANSWER,
        payload: {
          question,
          userAnswer,
        }
      });
  });
});
