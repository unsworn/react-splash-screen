import React from 'react';
import away from 'away';

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    color: 'white',
    overflow: 'hidden',
    zIndex: 66666,
    backgroundColor: 'rgba(255,102,255,.51)',
    background: 'rgba(100,100,100,1)',
  }
};

export default class SplashScreen extends React.Component {
  static propTypes = {
    enabled: React.PropTypes.bool,
    timeout: React.PropTypes.number,
    onIdle: React.PropTypes.func,
    onActive: React.PropTypes.func,
    //events: React.PropTypes.string,
  };

  static defaultProps = {
    timeout: 10 * 60 * 1000,
    enabled: true,
    onActive: () => {},
    onIdle: () => {},
    //events: 'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove'
  };

  constructor(props) {
    super(props);
    this.state = {
      idle: true,
    };
  }

  createTimer() {
    this.idleTimer = away({
      timeout: this.props.timeout,
      idle: this.state.idle
    });

    this.idleTimer.on('idle', () => {
      //console.log('SplashScreen: idle');
      this.props.onIdle();
      this.setState({idle: true});
    }.bind(this));

    this.idleTimer.on('active', () => {
      //console.log('SplashScreen: active');
      this.props.onActive();
      this.setState({idle: false})
    }.bind(this));
  }

  destroyTimer() {
    this.idleTimer.stop();
  }

  componentDidMount() {
    if (this.props.enabled) {
      this.createTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.enabled && !this.props.enabled) {
      this.createtimer();
    } else if (!nextProps.enabled && this.props.enabled) {
      this.destroyTimer();
    }
  }

  componentWillUnMount() {
    this.destroyTimer();
  }

  render() {
    if (!this.props.enabled || !this.state.idle) {
      return null;
    } else {
      return (
        <div style={styles.container}>
          {this.props.children}
        </div>
      );
    }
  }
}
