import { render, screen } from '@testing-library/react';
import HeroSearch from '../HeroSearch';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('HeroSearch', () => {
  it('renders the keyword search input', () => {
    render(<HeroSearch />);
    expect(
      screen.getByPlaceholderText('Cargo, empresa o habilidad...')
    ).toBeInTheDocument();
  });

  it('renders the location input', () => {
    render(<HeroSearch />);
    expect(
      screen.getByPlaceholderText('Ciudad o remoto...')
    ).toBeInTheDocument();
  });

  it('renders the search button', () => {
    render(<HeroSearch />);
    expect(
      screen.getByRole('button', { name: /buscar/i })
    ).toBeInTheDocument();
  });

  it('renders quick-search chips', () => {
    render(<HeroSearch />);
    expect(screen.getByText('React Developer')).toBeInTheDocument();
    expect(screen.getByText('UX Designer')).toBeInTheDocument();
  });
});
