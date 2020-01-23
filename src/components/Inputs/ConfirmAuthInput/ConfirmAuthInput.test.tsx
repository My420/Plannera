import React from 'react';
import { shallow } from 'enzyme';
import { AuthInputProps } from '../AuthInput/AuthInput';
import { CONFIRM } from '../../../utils/constant';
import ConfirmAuthInput, { ConfirmAuthInputProps } from './ConfirmAuthInput';

describe('test ConfirmAuthInput component', () => {
  const props: ConfirmAuthInputProps = {
    value: '',
    isValid: false,
    error: '',
    onInputChange: () => {},
    extensionContainerClass: 'testContainerClass',
    extensionInputClass: 'testInputClass',
  };
  const wrapper = shallow(<ConfirmAuthInput {...props} />);

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Memo(AuthInput) component with expected props', () => {
    const expectedProps: AuthInputProps = {
      id: 'confirm',
      name: CONFIRM,
      type: 'password',
      placeholder: 'Confirm password',
      label: 'Confirm password',
      ...props,
    };
    expect(wrapper.find('Memo(AuthInput)').props()).toEqual(expectedProps);
  });
});
