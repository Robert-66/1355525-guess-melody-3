import React from 'react';
import renderer from 'react-test-renderer';
import Errors from './errors';

describe(`Should Mistakes render correctly`, () => {
  it(`With zero count`, () => {
    const tree = renderer
      .create(
          <Errors
            count={0}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With one count`, () => {
    const tree = renderer
      .create(
          <Errors
            count={1}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
