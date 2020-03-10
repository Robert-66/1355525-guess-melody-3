import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './audio-player';

configure({adapter: new Adapter()});

const song = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`
};

beforeEach(() => {
  jest
    .spyOn(window.HTMLMediaElement.prototype, `play`)
    .mockImplementation(function () {
      // eslint-disable-next-line no-invalid-this
      if (this.onplay) {
        // eslint-disable-next-line no-invalid-this
        this.onplay();
      }
    });

  jest
    .spyOn(window.HTMLMediaElement.prototype, `pause`)
    .mockImplementation(function () {
      // eslint-disable-next-line no-invalid-this
      if (this.onpause) {
        // eslint-disable-next-line no-invalid-this
        this.onpause();
      }
    });

});


it(`onClickPlayPauseButton should be called`, () => {
  const handlePlayPauseButtonClick = jest.fn();
  const audioPlayer = mount(<AudioPlayer
    isActive={false}
    onClickPlayPauseButton={handlePlayPauseButtonClick}
    src={song.src}
  />);

  audioPlayer.setState({isLoading: false});
  audioPlayer.find(`button.track__button`).simulate(`click`);

  expect(handlePlayPauseButtonClick).toHaveBeenCalledTimes(1);
});

it(`onPlayPauseButtonClick don't should be called`, () => {
  const handlePlayPauseButtonClick = jest.fn();
  const audioPlayer = mount(<AudioPlayer
    isActive={true}
    onClickPlayPauseButton={handlePlayPauseButtonClick}
    src={song.src}
  />);

  audioPlayer.setState({isLoading: false});
  audioPlayer.find(`button.track__button`).simulate(`click`);

  expect(handlePlayPauseButtonClick).toHaveBeenCalledTimes(0);
});

it(`Click on play button should work correctly`, () => {
  const audioPlayer = mount(<AudioPlayer
    isActive={true}
    onClickPlayPauseButton={() => {}}
    src={song.src}
  />);
  const trackButton = audioPlayer.find(`button.track__button`);

  audioPlayer.setState({isLoading: false});

  trackButton.simulate(`click`);
  expect(audioPlayer.find(`button.track__button`).hasClass(`track__button--pause`)).toEqual(true);

  trackButton.simulate(`click`);
  expect(audioPlayer.find(`button.track__button`).hasClass(`track__button--play`)).toEqual(true);
});

it(`Click on play button should change state correctly`, () => {
  const audioPlayer = mount(<AudioPlayer
    isActive={true}
    onClickPlayPauseButton={() => {}}
    src={song.src}
  />);
  const trackButton = audioPlayer.find(`button.track__button`);

  audioPlayer.setState({isLoading: false});

  trackButton.simulate(`click`);
  expect(audioPlayer.state().isPlaying).toBeTruthy();

  trackButton.simulate(`click`);
  expect(audioPlayer.state().isPlaying).toBeFalsy();
});
