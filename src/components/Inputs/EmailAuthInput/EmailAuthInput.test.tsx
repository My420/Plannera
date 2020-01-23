import React from 'react';
import { shallow } from 'enzyme';
import { AuthInputProps } from '../AuthInput/AuthInput';
import { EMAIL } from '../../../utils/constant';
import EmailAuthInput, { EmailAuthInputProps } from './EmailAuthInput';

describe('test EmailAuthInput component', () => {
  const props: EmailAuthInputProps = {
    value: '',
    isValid: false,
    error: '',
    onInputChange: () => {},
    extensionContainerClass: 'testContainerClass',
    extensionInputClass: 'testInputClass',
  };
  const wrapper = shallow(<EmailAuthInput {...props} />);

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Memo(AuthInput) component with expected props', () => {
    const expectedProps: AuthInputProps = {
      id: 'email',
      name: EMAIL,
      type: 'email',
      placeholder: 'Email',
      label: 'Email',
      ...props,
    };
    expect(wrapper.find('Memo(AuthInput)').props()).toEqual(expectedProps);
  });
});
