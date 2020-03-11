import React, {createRef} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: false,
    };

    this.audioRef = createRef();
    this.handlePlayPauseButtonClick = this.handlePlayPauseButtonClick.bind(this);
  }

  componentDidMount() {
    const audio = this.audioRef.current;
    audio.src = this.props.src;

    audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    audio.onpause = () => this.setState({
      isPlaying: false,
    });

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime
    });

    if (this.props.autoplay) {
      audio.play();
    }
  }

  componentDidUpdate() {
    const audio = this.audioRef.current;

    if (!this.props.isActive && this.state.isPlaying) {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this.audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  handlePlayPauseButtonClick() {
    const audio = this.audioRef.current;

    if (!this.props.isActive) {
      this.props.onClickPlayPauseButton();
    }

    if (this.state.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this.handlePlayPauseButtonClick}
        />
        <div className="track__status">
          <audio ref={this.audioRef} />
        </div>
      </>
    );
  }
}

AudioPlayer.propTypes = {
  onClickPlayPauseButton: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
};

export default AudioPlayer;
