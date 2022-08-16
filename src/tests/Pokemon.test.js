import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <Pokemon.js />.', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>),
      history,
    });
  };

  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('se clicar no link faz redirecionar para a página de detalhes de pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const inputSaveFavorite = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(inputSaveFavorite);
    const favoriteImage = screen
      .getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
