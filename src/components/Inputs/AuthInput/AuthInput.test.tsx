import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  afterEach(cleanup);

  test('should match snapshot', () => {
    const { asFragment } = render(<AuthInput {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render label that associate with input', () => {
    render(<AuthInput {...props} />);
    const elem = screen.getByLabelText(props.label);
    expect(elem.tagName).toBe('INPUT');
  });

  test("should render tag span with label text and 'visually-hidden' class", () => {
    render(<AuthInput {...props} />);
    const elem = screen.getByText(props.label);
    expect(elem).toHaveClass('visually-hidden');
  });

  test('should render tag input with correct attr', () => {
    render(<AuthInput {...props} />);
    const elem = screen.getByPlaceholderText(props.placeholder);
    expect(elem.tagName).toBe('INPUT');
    expect(elem).toHaveValue(props.value);
    expect(elem).toHaveAttribute('type', props.type);
  });

  test('should render correct tag span with error if props.isValid = false', () => {
    render(<AuthInput {...props} />);
    const elem = screen.getByTestId('error');
    expect(elem).toHaveClass('error');
    expect(elem).toHaveTextContent(props.error);
  });

  test('should render correct tag span with error if props.isValid = true', () => {
    const errorText = 'error error';
    const newProps = { ...props, isValid: true, error: errorText };
    render(<AuthInput {...newProps} />);
    const elem = screen.getByText(errorText);
    expect(elem).toHaveClass('valid');
  });

  test('when user enters text should call props.onInputChange function', async () => {
    render(<AuthInput {...props} />);
    const elem = screen.getByPlaceholderText(props.placeholder);
    const text = 'test user input';
    await userEvent.type(elem, text, { allAtOnce: true });
    expect(mockFn).toHaveBeenCalledWith(props.name, text);
  });
});
