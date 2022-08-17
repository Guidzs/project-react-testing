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

  test('se as informações detalhadas do pokémon selecionado são mostradas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/151');

    const detailsTitle = screen.getByRole('heading', { level: 2, name: /mew details/i });
    const moreDetalisLink = screen.queryByRole('link', { name: /more details/i });
    const summaryTitle = screen.getByRole('heading', { level: 2, name: /summary/i });
    const summaryParagraph = screen
      .getByText(/Apparently, it appears only to those people/i);

    expect(detailsTitle).toBeInTheDocument();
    expect(moreDetalisLink).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryParagraph).toBeInTheDocument();
  });

  test('se existe na página uma seção com os mapas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/143');

    const locationTitle = screen
      .getByRole('heading', { level: 2, name: /game locations of snorlax/i });
    const cityTitle = screen.getByText(/kanto vermillion city/i);
    const mapCityImage = screen.getByRole('img', { name: /snorlax location/i });

    expect(locationTitle).toBeInTheDocument();
    expect(cityTitle).toBeInTheDocument();
    expect(mapCityImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png');
  });

  test('se o usuário pode favoritar um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');

    const markedAsFavorite = screen
      .queryByRole('img', { name: /Caterpie is marked as favorite/i });
    expect(markedAsFavorite).not.toBeInTheDocument();
    const inputSaveFavorite = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(inputSaveFavorite);
    const markedAsFavorit = screen
      .queryByRole('img', { name: /Caterpie is marked as favorite/i });
    expect(markedAsFavorit).toBeInTheDocument();
    userEvent.click(inputSaveFavorite);
    expect(markedAsFavorite).not.toBeInTheDocument();
  });
});
