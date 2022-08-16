import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Teste o componente <About.js />.', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>),
      history,
    });
  };

  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const titleAbout = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(titleAbout).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const fristParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(fristParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imagePokedex = screen.getByRole('img', { name: /pokédex/i });
    const URL_IMAGE = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagePokedex).toHaveAttribute('src', URL_IMAGE);
  });
});
