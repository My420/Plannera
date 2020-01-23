import React from 'react';
import { shallow } from 'enzyme';
import { AuthInputProps } from '../AuthInput/AuthInput';
import { PASSWORD } from '../../../utils/constant';
import PasswordAuthInput, { PasswordAuthInputProps } from './PasswordAuthInput';

describe('test PasswordAuthInput component', () => {
  const props: PasswordAuthInputProps = {
    value: '',
    isValid: false,
    error: '',
    onInputChange: () => {},
    extensionContainerClass: 'testContainerClass',
    extensionInputClass: 'testInputClass',
  };
  const wrapper = shallow(<PasswordAuthInput {...props} />);

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Memo(AuthInput) component with expected props', () => {
    const expectedProps: AuthInputProps = {
      id: 'password',
      name: PASSWORD,
      type: 'password',
      placeholder: 'Password',
      label: 'Password',
      ...props,
    };
    expect(wrapper.find('Memo(AuthInput)').props()).toEqual(expectedProps);
  });
});
