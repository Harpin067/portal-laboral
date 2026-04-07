import { create } from 'zustand';

interface Filtros {
  ubicacion: string;
  tipoTrabajo: string;
  modalidad: string;
}

interface CandidatoStore {
  filtros: Filtros;
  trabajosGuardados: string[];
  setFiltros: (filtros: Partial<Filtros>) => void;
  toggleGuardarTrabajo: (id: string) => void;
}

export const useCandidatoStore = create<CandidatoStore>((set) => ({
  filtros: {
    ubicacion: '',
    tipoTrabajo: '',
    modalidad: '',
  },
  trabajosGuardados: [],
  setFiltros: (filtros) =>
    set((state) => ({ filtros: { ...state.filtros, ...filtros } })),
  toggleGuardarTrabajo: (id) =>
    set((state) => ({
      trabajosGuardados: state.trabajosGuardados.includes(id)
        ? state.trabajosGuardados.filter((j) => j !== id)
        : [...state.trabajosGuardados, id],
    })),
}));
