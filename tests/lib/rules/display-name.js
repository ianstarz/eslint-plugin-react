/**
 * @fileoverview Prevent missing displayName in a React component definition
 * @author Yannick Croissant
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/display-name');
var RuleTester = require('eslint').RuleTester;

require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('display-name', rule, {

  valid: [{
    code: [
      'var React = require(\'react\');',
      'var Hello = React.createClass({',
      '  displayName: \'Hello\',',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    ecmaFeatures: {
      jsx: true
    }
  }, {
    code: [
      'var React = require(\'react\');',
      'class Hello extends React.Component {',
      '  render() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '}',
      'Hello.displayName = \'Hello\''
    ].join('\n'),
    ecmaFeatures: {
      classes: true,
      jsx: true
    }
  }, {
    code: [
      'class Hello {',
      '  render() {',
      '    return \'Hello World\';',
      '  }',
      '}'
    ].join('\n'),
    ecmaFeatures: {
      classes: true,
      jsx: true
    }
  }, {
    code: [
      'class Hello {',
      '  method',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    ecmaFeatures: {
      classes: true,
      jsx: true
    }
  }, {
    code: [
      'var React = require(\'react\');',
      'class Hello extends React.Component {',
      '  static get displayName() {',
      '    return \'Hello\';',
      '  }',
      '  render() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '}'
    ].join('\n'),
    ecmaFeatures: {
      classes: true,
      jsx: true
    }
  }, {
    code: [
      'var React = require(\'react\');',
      'class Hello extends React.Component {',
      '  static displayName = \'Widget\'',
      '  render() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    ecmaFeatures: {
      classes: true,
      jsx: true
    }
  }, {
    code: [
      'var React = require(\'react\');',
      'var Hello = React.createClass({',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      acceptTranspilerName: true
    }],
    ecmaFeatures: {
      classes: true,
      jsx: true
    }
  }, {
    code: [
      'var React = require(\'react\');',
      'class Hello extends React.Component {',
      '  render() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: [{
      acceptTranspilerName: true
    }]
  }, {
    code: [
      'export default class Hello {',
      '  render() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '}'
    ].join('\n'),
    parser: 'babel-eslint',
    options: [{
      acceptTranspilerName: true
    }]
  }, {
    code: [
      'var React = require(\'react\');',
      'var Hello;',
      'Hello = React.createClass({',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    options: [{
      acceptTranspilerName: true
    }],
    ecmaFeatures: {
      jsx: true
    }
  }, {
    code: [
      'var React = require(\'react\');',
      'var Hello = React.createClass({',
      '  displayName: \'Hello\',',
      '  render: function() {',
      '    let { a, ...b } = obj;',
      '    let c = { ...d };',
      '    return <div />;',
      '  }',
      '});'
    ].join('\n'),
    env: {
      es6: true
    },
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  }],

  invalid: [{
    code: [
      'var React = require(\'react\');',
      'var Hello = React.createClass({',
      '  render: function() {',
      '    return React.createElement("div", {}, "text content");',
      '  }',
      '});'
    ].join('\n'),
    ecmaFeatures: {
      jsx: false
    },
    errors: [{
      message: 'Component definition is missing display name'
    }]
  }, {
    code: [
      'var React = require(\'react\');',
      'var Hello = React.createClass({',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    ecmaFeatures: {
      jsx: true
    },
    errors: [{
      message: 'Component definition is missing display name'
    }]
  }, {
    code: [
      'var React = require(\'react\');',
      'class Hello extends React.Component {',
      '  render() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '}'
    ].join('\n'),
    ecmaFeatures: {
      classes: true,
      jsx: true
    },
    errors: [{
      message: 'Hello component definition is missing display name'
    }]
  }, {
    code: [
      'var React = require(\'react\');',
      'function HelloComponent() {',
      '  return React.createClass({',
      '    render: function() {',
      '      return <div>Hello {this.props.name}</div>;',
      '    }',
      '  });',
      '}',
      'module.exports = HelloComponent();'
    ].join('\n'),
    options: [{
      acceptTranspilerName: true
    }],
    ecmaFeatures: {
      classes: true,
      jsx: true
    },
    errors: [{
      message: 'Component definition is missing display name'
    }]
  }
]});
