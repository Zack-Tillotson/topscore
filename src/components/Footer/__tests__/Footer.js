import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Footer from '../';
import InlineCss from 'react-inline-css';

describe("Footer", function() {

	let output;

	beforeEach(() => {
		const renderer = ReactTestUtils.createRenderer();
  	renderer.render((
  		<Footer />
  	));
  	output = renderer.getRenderOutput();
	});

  it("renders with InlineCss container", function() {  	
    expect(!!output).toBe(true);
    expect(output.type.displayName).toBe(InlineCss.displayName);
  });

  it("renders one footer element", function() {
  	expect(typeof output.props.children).toBe('object');
  	expect(output.props.children.type).toBe('footer');
  });

});