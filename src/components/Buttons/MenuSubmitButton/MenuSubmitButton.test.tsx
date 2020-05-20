import React from 'react';
import { shallow } from 'enzyme';
import MenuSubmitButton from './MenuSubmitButton';

describe('Test MenuSubmitButton component', () => {
  const text = 'Text Button';
  const name = 'testBtn';
  const testAttr = 'test';
  const mockFn = jest.fn();
  const wrapper = shallow(
    <MenuSubmitButton text={text} name={name} onButtonClick={mockFn} data-test={testAttr} />,
  );

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render  tag button', () => {
    const tag = wrapper.find('button');
    expect(tag).toHaveLength(1);
  });

  test('tag button should have correct default className', () => {
    const actual = wrapper.find('button').prop('className');
    const expected = 'button ';
    expect(actual).toBe(expected);
  });

  test('tag button should have correct attr type', () => {
    const actual = wrapper.find('button').prop('type');
    const expected = 'submit';
    expect(actual).toBe(expected);
  });

  test('tag button should have correct attr name', () => {
    const actual = wrapper.find('button').prop('name');
    const expected = name;
    expect(actual).toBe(expected);
  });

  test('tag button should have correct attr onClick', () => {
    const actual = wrapper.find('button').prop('onClick');
    const expected = mockFn;
    expect(actual).toEqual(expected);
  });

  test('tag button should have correct data-test attr', () => {
    const actual = wrapper.find('button').prop('data-test');
    const expected = testAttr;
    expect(actual).toEqual(expected);
  });

  test('tag button should have correct children text', () => {
    const actual = wrapper.find('button').prop('children');
    const expected = text;
    expect(actual).toEqual(expected);
  });

  test('tag button should have correct className attr if extensionClass prop was transferred', () => {
    const extClass = 'newClass';
    const props = {
      text,
      name,
      onClick: mockFn,
      'data-test': testAttr,
      extensionClass: extClass,
    };
    const actual = wrapper
      .setProps(props)
      .find('button')
      .prop('className');
    const expected = `button ${extClass}`;
    expect(actual).toEqual(expected);
  });
});
