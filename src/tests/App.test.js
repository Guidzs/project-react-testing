import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={ history }>{component}</Router>),
      history,
    });
  };

  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    const linkFavoritePokémons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavoritePokémons).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada para a URL / ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });

    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('se a aplicação é redirecionada para a URL /about ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });

    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('se a aplicação é redirecionada para URL /favorites ao clicar em favorite', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokémons = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(linkFavoritePokémons);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('se a aplicação renderiza a página Not Found em caso de URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/tyrbe');
    const notFoundTitle = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
