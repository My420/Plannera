import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuSubmitButton, { MenuSubmitButtonProps } from './MenuSubmitButton';

describe('test MenuSubmitButton component', () => {
  const mockFn = jest.fn();
  const props: MenuSubmitButtonProps = {
    text: 'Test Button',
    name: 'MSButton',
    onButtonClick: mockFn,
  };

  const expected = {
    type: 'submit',
  };

  afterEach(cleanup);

  test('should match snapshot', () => {
    const { asFragment } = render(<MenuSubmitButton {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render tag button', () => {
    render(<MenuSubmitButton {...props} />);
    const elem = screen.getByText(props.text);
    expect(elem.tagName).toBe('BUTTON');
  });

  test('button should have correct attr', () => {
    render(<MenuSubmitButton {...props} />);
    const elem = screen.getByText(props.text);
    expect(elem).toHaveAttribute('type', expected.type);
    expect(elem).toHaveAttribute('name', props.name);
  });

  test('the button should receive focus by pressing the tab key', () => {
    render(<MenuSubmitButton {...props} />);
    const elem = screen.getByText(props.text);
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(elem).toHaveFocus();
  });

  test('click on button should call the passed function', () => {
    render(<MenuSubmitButton {...props} />);
    const elem = screen.getByText(props.text);
    expect(mockFn).not.toHaveBeenCalled();
    userEvent.click(elem);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
