import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailAuthInput, { EmailAuthInputProps } from './EmailAuthInput';
import { EMAIL } from '../../../utils/constant';

describe('test EmailAuthInput component', () => {
  const mockFn = jest.fn();
  const props: EmailAuthInputProps = {
    value: '',
    isValid: false,
    error: '',
    onInputChange: mockFn,
  };

  const expected = {
    textLabel: 'Email',
    placeholder: 'Email',
    type: 'email',
    name: EMAIL,
  };

  afterEach(cleanup);

  test('should match snapshot', () => {
    const { asFragment } = render(<EmailAuthInput {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render label that associate with input', () => {
    render(<EmailAuthInput {...props} />);
    const elem = screen.getByLabelText(expected.textLabel);
    expect(elem.tagName).toBe('INPUT');
  });

  test("should render tag span with label text and 'visually-hidden' class", () => {
    render(<EmailAuthInput {...props} />);
    const elem = screen.getByText(expected.textLabel);
    expect(elem).toHaveClass('visually-hidden');
  });

  test('should render tag input with correct attr', () => {
    render(<EmailAuthInput {...props} />);
    const elem = screen.getByPlaceholderText(expected.placeholder);
    expect(elem.tagName).toBe('INPUT');
    expect(elem).toHaveValue(props.value);
    expect(elem).toHaveAttribute('type', expected.type);
  });

  test('should render correct tag span with error if props.isValid = false', () => {
    render(<EmailAuthInput {...props} />);
    const elem = screen.getByTestId('error');
    expect(elem).toHaveClass('error');
    expect(elem).toHaveTextContent(props.error);
  });

  test('should render correct tag span with error if props.isValid = true', () => {
    const errorText = 'error error';
    const newProps = { ...props, isValid: true, error: errorText };
    render(<EmailAuthInput {...newProps} />);
    const elem = screen.getByText(errorText);
    expect(elem).toHaveClass('valid');
  });

  test('when user enters text should call props.onInputChange function', async () => {
    render(<EmailAuthInput {...props} />);
    const elem = screen.getByPlaceholderText(expected.placeholder);
    const text = 'test user input';
    await userEvent.type(elem, text, { allAtOnce: true });
    expect(mockFn).toHaveBeenCalledWith(expected.name, text);
  });
});
