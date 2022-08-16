import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <Pokedex.js />.', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>),
      history,
    });
  };

  test('se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const subTitle = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(subTitle).toBeInTheDocument();
  });

  test('se é exibido o próximo pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNextPokemon);
    expect(pokemonName).toHaveTextContent(/charmander/i);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    expect(pokemonName).toHaveTextContent(/rapidash/i);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttonsByTypes = screen.getAllByTestId('pokemon-type-button');
    buttonsByTypes.forEach((btnType, idx) => {
      userEvent.click(btnType);
      const pokemonType = screen.getByTestId('pokemon-type');
      const btnAll = screen.getByRole('button', { name: /all/i });
      expect(btnAll).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent(types[idx]);
      expect(btnType).toHaveTextContent(types[idx]);
    });
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /all/i });
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(btnAll).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/electric/i);
    const btnFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(btnFire);
    expect(pokemonType).toHaveTextContent(/fire/i);
    userEvent.click(btnAll);
    expect(pokemonType).toHaveTextContent(/electric/i);
  });
});
