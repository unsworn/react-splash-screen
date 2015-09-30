'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _away = require('away');

var _away2 = _interopRequireDefault(_away);

var styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10000,
    backgroundColor: 'green'
  }
};

var SplashScreen = (function (_React$Component) {
  _inherits(SplashScreen, _React$Component);

  _createClass(SplashScreen, null, [{
    key: 'propTypes',
    value: {
      enabled: _react2['default'].PropTypes.bool,
      timeout: _react2['default'].PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      //timeout: 10 * 60 * 1000
      timeout: 10 * 1000
    },
    enumerable: true
  }]);

  function SplashScreen(props) {
    _classCallCheck(this, SplashScreen);

    _get(Object.getPrototypeOf(SplashScreen.prototype), 'constructor', this).call(this, props);
    this.state = {
      idle: true
    };
  }

  _createClass(SplashScreen, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.idleTimer = (0, _away2['default'])(this.props.timeout, { idle: this.state.idle });

      this.idleTimer.on('idle', (function () {
        console.log('idle');
        _this.setState({ idle: true });
      }).bind(this));

      this.idleTimer.on('active', (function () {
        console.log('active');
        _this.setState({ idle: false });
      }).bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      //if (this.state.idle)

      return _react2['default'].createElement(
        'div',
        { style: styles.container },
        this.props.children
      );
    }
  }]);

  return SplashScreen;
})(_react2['default'].Component);

exports['default'] = SplashScreen;
module.exports = exports['default'];