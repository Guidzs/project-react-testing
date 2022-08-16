import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />.', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>),
      history,
    });
  };

  test('se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const IMAGE_ALT = /Pikachu crying because the page requested was not found/i;
    const IMAGE_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageNotFound = screen.getByRole('img', { name: IMAGE_ALT });
    expect(imageNotFound).toHaveAttribute('src', IMAGE_URL);
  });
});
