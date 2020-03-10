import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player';

const song = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`
};

it(`AudioPlayer is rendered correctly`, () => {
  const tree = renderer
    .create(
        <AudioPlayer
          isActive={false}
          onClickPlayPauseButton={() => {}}
          src={song.src}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();
  expect(tree).toMatchSnapshot();
});
