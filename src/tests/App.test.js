import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';

import store from '../redux/store';

describe('App Component', () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  test('When rendered, the app name should be displayed', () => {
    // Arrange
    const expectedAppName = 'Forums App';

    // Act
    const linkElement = screen.getByText(/forums app/i);

    // Assert
    expect(linkElement.textContent).toBe(expectedAppName);
  });
});
