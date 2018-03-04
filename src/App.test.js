import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import App from './App';
import App from './components/App/index';
import { Search } from "./components/Search";
import Button from './components/Buttons';
import { Table } from "./components/Table";

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', ()=> {
    const component = renderer.create(
      <App />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', ()=> {
    const component = renderer.create(
      <Search>Search</Search>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Give me more</Button>, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', ()=> {
    const component = renderer.create(
      <Button>Give me more</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Table', () => {
  const props = {
    list: [
      {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
      {title: '2', author: '2', num_comments: 2, points: 2, objectID: 'x'},
    ]
  };
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table {...props}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in list', () => {
    const  element = shallow(
      <Table { ...props } />
    );
    expect(element.find('.table-row').length).toBe(2);
  });
});
