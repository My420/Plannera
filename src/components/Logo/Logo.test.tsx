import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import Logo from './Logo';

describe('test Logo component', () => {
  afterEach(cleanup);

  const color = 'red';

  test('should match snapshot', () => {
    const { asFragment } = render(<Logo />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render logo', () => {
    render(<Logo />);
    const elem = screen.getByTitle('Plannera logo');
    expect(elem).toBeTruthy();
  });

  test('logo should have correct color', () => {
    render(<Logo />);
    const elem = screen.getByTestId('img');
    expect(elem).toHaveAttribute('fill', '#ececec');
  });

  test('logo should have correct color if pass color props', () => {
    render(<Logo color={color} />);
    const elem = screen.getByTestId('img');
    expect(elem).toHaveAttribute('fill', color);
  });
});
