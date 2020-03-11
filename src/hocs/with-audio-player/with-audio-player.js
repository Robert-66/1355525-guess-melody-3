import React, {PureComponent} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player';

function withAudioPlayer(Component) {
  class WithAudioPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    handlePlayPauseButtonClick(id) {
      this.setState((prevState) => ({
        activePlayerId: prevState.activePlayerId === id ? -1 : id
      }));
    }

    render() {
      return (
        <Component
          {...this.props}
          renderPlayer={(src, id, autoplay = false) => {
            return (
              <AudioPlayer
                src={src}
                isActive={id === this.state.activePlayerId}
                onClickPlayPauseButton={() => this.handlePlayPauseButtonClick(id)}
                autoplay={autoplay}
              />
            );
          }}
        />
      );
    }
  }

  WithAudioPlayer.propTypes = {};

  return WithAudioPlayer;
}

export default withAudioPlayer;

