import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should welcome button be pressed`, () => {
  const handleWelcomeButtonClick = jest.fn();
  const welcomeScreen = shallow(
      <WelcomeScreen
        errorsCount={3}
        onClickWelcomeButton={handleWelcomeButtonClick}
      />
  );

  const welcomeButton = welcomeScreen.find(`button.welcome__button`);

  welcomeButton.props().onClick();

  expect(handleWelcomeButtonClick.mock.calls.length).toBe(1);
});
