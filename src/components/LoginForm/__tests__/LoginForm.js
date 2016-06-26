// import React from 'react';
// import ReactTestUtils from 'react-addons-test-utils';
// import LoginForm from '../';

// function stubConnect() {
// 	return {
// 		store: {
// 			getState: () => {
// 				return {
// 					firebase: {}
// 				};
// 			},
// 			subscribe: () => {},
// 			dispatch: () => {},
// 		}
// 	}
// }

// describe("LoginForm", function() {

// 	let output;

// 	beforeEach(() => {
// 		const renderer = ReactTestUtils.createRenderer();
//   	renderer.render((
//   		<LoginForm {...stubConnect()}/>
//   	));
//   	output = renderer.getRenderOutput();
// 	});

//   it("renders container", function() {  	
//     expect(!!output).toBe(true);
//     console.log(output);
//     expect(output.props.componentName).toBe('container');
//   });

//   it("renders the login providers correctly", function() {
//   	console.log("output!", output);
//   	debugger;
//     expect(output.props.children.find(comp => comp.props.className == 'loginSection').children.length).toBe(4);
//   });

// });