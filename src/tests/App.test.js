import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    const linkFavoritePokémons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavoritePokémons).toBeInTheDocument();
  });
});
