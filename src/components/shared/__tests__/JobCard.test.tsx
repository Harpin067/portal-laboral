import { render, screen } from '@testing-library/react';
import JobCard from '../JobCard';
import type { Job } from '@/lib/mock-jobs';

const mockJob: Job = {
  id: '99',
  titulo: 'Senior React Developer',
  empresa: 'TestCorp',
  logo: 'T',
  ubicacion: 'Lima',
  modalidad: 'Remoto',
  salario: 'S/. 5k–8k',
  tag: 'React',
  categoria: 'Tecnología',
  categoriaSlug: 'tecnologia',
  publicado: 'Hace 1 día',
  descripcion: 'Descripción de prueba.',
  responsabilidades: ['Tarea A'],
  requisitos: ['Requisito A'],
  beneficios: ['Beneficio A'],
};

describe('JobCard', () => {
  it('renders job title', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('Senior React Developer')).toBeInTheDocument();
  });

  it('renders company name', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('TestCorp')).toBeInTheDocument();
  });

  it('renders location', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('Lima')).toBeInTheDocument();
  });

  it('renders modalidad badge "Remoto"', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('Remoto')).toBeInTheDocument();
  });

  it('renders salary', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('S/. 5k–8k')).toBeInTheDocument();
  });

  it('links to the correct job detail URL', () => {
    render(<JobCard job={mockJob} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/empleos/99');
  });
});
