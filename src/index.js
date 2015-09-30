import React from 'react';
import away from 'away';

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10000,
    backgroundColor: 'green'
  }
};

export default class SplashScreen extends React.Component {
  static propTypes = {
    enabled: React.PropTypes.bool,
    timeout: React.PropTypes.number,
  };

  static defaultProps = {
    //timeout: 10 * 60 * 1000 
    timeout: 10 * 1000,
    enabled: true
  };

  constructor(props) {
    super(props);
    this.state = {
      idle: true
    };
  }

  createTimer() {
    this.idleTimer = away(this.props.timeout, {idle: this.state.idle});

    this.idleTimer.on('idle', () => {
      console.log('SplashScreen: idle');
      this.setState({idle: true})
    }.bind(this));

    this.idleTimer.on('active', () => {
      console.log('SplashScreen: active');
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
