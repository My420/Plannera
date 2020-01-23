import React from 'react';
import { shallow } from 'enzyme';
import { AuthInputProps } from '../AuthInput/AuthInput';
import { FIRST_NAME } from '../../../utils/constant';
import FirstNameAuthInput, { FirstNameAuthInputProps } from './FirstNameAuthInput';

describe('test FirstNameAuthInput component', () => {
  const props: FirstNameAuthInputProps = {
    value: '',
    isValid: false,
    error: '',
    onInputChange: () => {},
    extensionContainerClass: 'testContainerClass',
    extensionInputClass: 'testInputClass',
  };
  const wrapper = shallow(<FirstNameAuthInput {...props} />);

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Memo(AuthInput) component with expected props', () => {
    const expectedProps: AuthInputProps = {
      id: 'firstName',
      name: FIRST_NAME,
      type: 'text',
      placeholder: 'First name',
      label: 'First name',
      ...props,
    };
    expect(wrapper.find('Memo(AuthInput)').props()).toEqual(expectedProps);
  });
});
