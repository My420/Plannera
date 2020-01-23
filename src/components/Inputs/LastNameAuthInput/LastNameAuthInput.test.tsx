import React from 'react';
import { shallow } from 'enzyme';
import { AuthInputProps } from '../AuthInput/AuthInput';
import { LAST_NAME } from '../../../utils/constant';
import LastNameAuthInput, { LastNameAuthInputProps } from './LastNameAuthInput';

describe('test LastNameAuthInput component', () => {
  const props: LastNameAuthInputProps = {
    value: '',
    isValid: false,
    error: '',
    onInputChange: () => {},
    extensionContainerClass: 'testContainerClass',
    extensionInputClass: 'testInputClass',
  };
  const wrapper = shallow(<LastNameAuthInput {...props} />);

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Memo(AuthInput) component with expected props', () => {
    const expectedProps: AuthInputProps = {
      id: 'lastName',
      name: LAST_NAME,
      type: 'text',
      placeholder: 'Last name',
      label: 'Last name',
      ...props,
    };
    expect(wrapper.find('Memo(AuthInput)').props()).toEqual(expectedProps);
  });
});
