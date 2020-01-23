import React from 'react';
import { shallow } from 'enzyme';
import AuthInput, { AuthInputProps } from './AuthInput';

describe('test AuthInput component', () => {
  const mockFn = jest.fn();
  const props: AuthInputProps = {
    label: 'test label',
    type: 'text',
    name: 'test name',
    id: 'testID',
    value: '',
    placeholder: 'enter test text',
    isValid: false,
    error: '',
    onInputChange: mockFn,
  };
  const wrapper = shallow(<AuthInput {...props} />);

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render tag label with correct attr', () => {
    expect(wrapper.find('label').prop('htmlFor')).toBe(props.id);
    expect(wrapper.find('label').prop('className')).toBe('label ');
  });

  test("should render span with class='visually-hidden' with correct text", () => {
    expect(wrapper.find('span.visually-hidden').text()).toBe(props.label);
  });

  test('should correct render tag span with error', () => {
    expect(
      wrapper
        .find('span.error')
        .text()
        .trim(),
    ).toBe(props.error);
    wrapper.setProps({ isValid: true });
    expect(wrapper.find('span.error')).toHaveLength(0);
    expect(wrapper.find('span.valid')).toHaveLength(1);
  });

  test('should correct render tag input with correct attr', () => {
    const input = wrapper.find('input');
    expect(input.prop('value')).toBe(props.value);
    expect(input.prop('id')).toBe(props.id);
    expect(input.prop('className')).toBe('input ');
    expect(input.prop('name')).toBe(props.name);
    expect(input.prop('type')).toBe(props.type);
    expect(input.prop('placeholder')).toBe(props.placeholder);
  });

  test('should call onInputChange prop function when input change with correct arguments', () => {
    const currentTarget = {
      name: props.name,
      value: 'test value',
    };
    wrapper.find('input').simulate('change', { currentTarget });
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(props.name, currentTarget.value);
  });

  test('should correct set extension class', () => {
    const ext = {
      extensionContainerClass: 'extContainer',
      extensionInputClass: 'extInput',
    };
    wrapper.setProps({ ...ext });
    expect(wrapper.find('label').prop('className')).toBe(`label ${ext.extensionContainerClass}`);
    expect(wrapper.find('input').prop('className')).toBe(`input ${ext.extensionInputClass}`);
  });
});
