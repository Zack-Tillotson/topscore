import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Header from '../';
import InlineCss from 'react-inline-css';

describe("Header", function() {

  describe("with preferences open", function() {

    let output;

    beforeEach(() => {
      const renderer = ReactTestUtils.createRenderer();
      renderer.render((
        <Header preferencesOpen={true} />
      ));
      output = renderer.getRenderOutput();
    });

    it("renders with InlineCss container", function() {   
      expect(!!output).toBe(true);
      expect(output.type.displayName).toBe(InlineCss.displayName);
    });

    it("renders one header element", function() {
      expect(typeof output.props.children).toBe('object');
      expect(output.props.children.type).toBe('header');
    });

    it("the header has two links to the homepage", function() {
      expect(output.props.children.props.children.filter(child => 
        child && child.type.displayName == 'Link' && child.props.to == '/'
      ).length).toBe(2);
    });

  });

  describe("with preferences closed", function() {

    let output;

    beforeEach(() => {
      const renderer = ReactTestUtils.createRenderer();
      renderer.render((
        <Header preferencesOpen={false} />
      ));
      output = renderer.getRenderOutput();
    });

    it("renders with InlineCss container", function() {   
      expect(!!output).toBe(true);
      expect(output.type.displayName).toBe(InlineCss.displayName);
    });

    it("renders one header element", function() {
      expect(typeof output.props.children).toBe('object');
      expect(output.props.children.type).toBe('header');
    });

    it("the header has a link to the homepage", function() {
      expect(!!output.props.children.props.children.find(child => 
        child.type.displayName == 'Link' && child.props.to == '/')
      ).toBeDefined();
    });

    it("the header has a link to /preferences", function() {
      expect(!!output.props.children.props.children.find(child => 
        !!child && child.type.displayName == 'Link' && child.props.to == '/preferences'
      )).toBeDefined();
    });

  });

});