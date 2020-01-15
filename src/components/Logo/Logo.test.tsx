import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

describe('test <Logo/> component', () => {
  describe('test <Logo/> component without props', () => {
    const wrapper = shallow(<Logo />);

    test('should correct render component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('should  render div with default className', () => {
      expect(wrapper.find('div').prop('className')).toBe('container');
    });

    test('should  render tag <g> with correct prop fill', () => {
      expect(wrapper.find('g').prop('fill')).toBe('#ececec');
    });
  });

  describe('test <Logo/> component with props', () => {
    const testClassName = 'test';
    const testColor = 'red';
    const wrapper = shallow(<Logo wrapperClass={testClassName} color={testColor} />);

    test('should correct render component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('should  render div with default className', () => {
      expect(wrapper.find('div').prop('className')).toBe(testClassName);
    });

    test('should  render tag <g> with correct prop fill', () => {
      expect(wrapper.find('g').prop('fill')).toBe(testColor);
    });
  });
});
