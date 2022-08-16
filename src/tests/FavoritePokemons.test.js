import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />.', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>),
      history,
    });
  };

  test('se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const NoFavorites = screen.getByText(/no favorite pokemon found/i);
    expect(NoFavorites).toBeInTheDocument();
  });

  test('se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const inputSaveFavorite = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(inputSaveFavorite);
    const linkFavoritePokémons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavoritePokémons);
    const markedAsFavorite = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(markedAsFavorite).toBeInTheDocument();
  });
});
