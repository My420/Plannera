import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import StatusBar from './StatusBar';

describe('test StatusBar component', () => {
  afterEach(cleanup);

  test('should match snapshot', () => {
    const text = 'test error msg';
    const { asFragment } = render(<StatusBar isLoading error={text} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render empty div if prop isLoading = false and error=''", () => {
    render(<StatusBar isLoading={false} error="" />);
    const element = screen.getByTestId('container');
    expect(element).toBeEmpty();
  });

  test('should render the loading icon if prop isLoading = true', () => {
    render(<StatusBar isLoading error="" />);
    const element = screen.getByTitle('Loading...');
    expect(element).toBeTruthy();
  });

  test('should render error message if prop error contains error text', () => {
    const text = 'test error msg';
    render(<StatusBar isLoading={false} error={text} />);
    const element = screen.getByText(text);
    expect(element).toBeTruthy();
  });

  test('should render loading icon and error msg', () => {
    const text = 'test error msg';
    render(<StatusBar isLoading error={text} />);

    const errorElem = screen.getByText(text);
    expect(errorElem).toBeTruthy();

    const loadingIcon = screen.getByTitle('Loading...');
    expect(loadingIcon).toBeTruthy();
  });
});
