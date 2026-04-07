export type Job = {
  id: string;
  titulo: string;
  empresa: string;
  logo: string;
  ubicacion: string;
  modalidad: 'Remoto' | 'Híbrido' | 'Presencial';
  salario: string;
  tag: string;
  categoria: string;
  categoriaSlug: string;
  publicado: string;
  descripcion: string;
  responsabilidades: string[];
  requisitos: string[];
  beneficios: string[];
};

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    titulo: 'Frontend Developer',
    empresa: 'Tigo El Salvador',
    logo: 'T',
    ubicacion: 'San Salvador',
    modalidad: 'Híbrido',
    salario: '$1,800–$2,500',
    tag: 'React',
    categoria: 'Tecnología',
    categoriaSlug: 'tecnologia',
    publicado: 'Hace 2 días',
    descripcion:
      'Buscamos un Frontend Developer apasionado por construir interfaces modernas y performantes. Trabajarás en el equipo de producto de Tigo El Salvador, contribuyendo a features usados por millones de personas.',
    responsabilidades: [
      'Desarrollar y mantener componentes React reutilizables.',
      'Colaborar con diseño para implementar UX de alta calidad.',
      'Optimizar el rendimiento de la aplicación web.',
      'Participar en code reviews y definición de arquitectura frontend.',
    ],
    requisitos: [
      '2+ años de experiencia con React y TypeScript.',
      'Conocimiento sólido de Next.js 13+.',
      'Familiaridad con Tailwind CSS o CSS-in-JS.',
      'Experiencia con pruebas unitarias (Jest, Testing Library).',
      'Inglés intermedio.',
    ],
    beneficios: [
      'Seguro médico privado.',
      'Días de trabajo remoto.',
      'Acceso a plataformas de aprendizaje.',
      'Bonos anuales por desempeño.',
    ],
  },
  {
    id: '2',
    titulo: 'UX Designer Senior',
    empresa: 'Banco Agrícola',
    logo: 'B',
    ubicacion: 'Santa Tecla',
    modalidad: 'Presencial',
    salario: '$1,500–$2,200',
    tag: 'Figma',
    categoria: 'Diseño',
    categoriaSlug: 'diseno',
    publicado: 'Hace 1 día',
    descripcion:
      'Como UX Designer Senior en Banco Agrícola liderarás el diseño de experiencias digitales para los productos bancarios más usados del país. Trabajarás en un equipo ágil colaborando con PMs, ingenieros y stakeholders de negocio.',
    responsabilidades: [
      'Liderar proyectos de diseño UX de principio a fin.',
      'Realizar investigación de usuarios y pruebas de usabilidad.',
      'Crear wireframes, prototipos de alta fidelidad en Figma.',
      'Mantener y evolucionar el Design System corporativo.',
    ],
    requisitos: [
      '4+ años de experiencia en UX/UI Design.',
      'Dominio de Figma y principios de diseño centrado en el usuario.',
      'Portafolio con casos de estudio detallados.',
      'Experiencia en entornos ágiles (Scrum/Kanban).',
    ],
    beneficios: [
      'Seguro de vida y médico.',
      'Subsidio de alimentación.',
      'Capacitaciones internacionales.',
    ],
  },
  {
    id: '3',
    titulo: 'Backend Engineer',
    empresa: 'Applaudo Studios',
    logo: 'A',
    ubicacion: 'Remoto',
    modalidad: 'Remoto',
    salario: '$2,500–$3,800',
    tag: 'Node.js',
    categoria: 'Tecnología',
    categoriaSlug: 'tecnologia',
    publicado: 'Hace 3 días',
    descripcion:
      'Applaudo Studios busca un Backend Engineer para diseñar y escalar los microservicios que potencian sus productos digitales. Rol 100% remoto con equipo global.',
    responsabilidades: [
      'Diseñar y desarrollar APIs REST y GraphQL.',
      'Gestionar bases de datos PostgreSQL y Redis.',
      'Garantizar escalabilidad y disponibilidad de servicios.',
      'Implementar prácticas DevOps con CI/CD.',
    ],
    requisitos: [
      '3+ años con Node.js y TypeScript.',
      'Experiencia con microservicios y arquitecturas distribuidas.',
      'Conocimiento de AWS o GCP.',
      'Inglés avanzado.',
    ],
    beneficios: [
      'Salario en USD.',
      'Horario flexible.',
      'Presupuesto para home office.',
      'Stock options.',
    ],
  },
  {
    id: '4',
    titulo: 'Product Manager',
    empresa: 'Scotiabank El Salvador',
    logo: 'S',
    ubicacion: 'San Salvador',
    modalidad: 'Híbrido',
    salario: '$2,800–$4,000',
    tag: 'Agile',
    categoria: 'Tecnología',
    categoriaSlug: 'tecnologia',
    publicado: 'Hace 4 días',
    descripcion:
      'Scotiabank El Salvador busca un Product Manager para liderar el desarrollo de productos digitales bancarios, definiendo la visión del producto y maximizando el valor para los clientes.',
    responsabilidades: [
      'Definir y priorizar el roadmap del producto.',
      'Trabajar con engineering, design y stakeholders.',
      'Analizar métricas y definir KPIs.',
      'Gestionar el backlog y ceremonias ágiles.',
    ],
    requisitos: [
      '3+ años como PM en productos digitales.',
      'Experiencia con metodologías ágiles.',
      'Habilidades analíticas y de comunicación.',
      'Deseable experiencia en fintech.',
    ],
    beneficios: [
      'Seguro médico familiar.',
      'Bono por desempeño.',
      'Capacitaciones certificadas.',
    ],
  },
  {
    id: '5',
    titulo: 'Data Analyst',
    empresa: 'Grupo Roble',
    logo: 'G',
    ubicacion: 'San Salvador',
    modalidad: 'Híbrido',
    salario: '$1,200–$1,800',
    tag: 'Python',
    categoria: 'Finanzas',
    categoriaSlug: 'finanzas',
    publicado: 'Hace 5 días',
    descripcion:
      'Grupo Roble busca un Data Analyst para extraer insights clave de los datos de negocio y apoyar la toma de decisiones estratégicas en el área de customer experience.',
    responsabilidades: [
      'Crear dashboards y reportes en Power BI / Tableau.',
      'Procesar y limpiar datos con Python y SQL.',
      'Presentar hallazgos a stakeholders no técnicos.',
      'Automatizar procesos de reporte.',
    ],
    requisitos: [
      '2+ años en análisis de datos.',
      'Dominio de Python (pandas, numpy) y SQL.',
      'Experiencia con herramientas de BI.',
      'Capacidad analítica y atención al detalle.',
    ],
    beneficios: [
      'Beneficios de ley completos.',
      'Seguro médico.',
      'Horario flexible viernes.',
    ],
  },
  {
    id: '6',
    titulo: 'DevOps Engineer',
    empresa: 'InTelliSource El Salvador',
    logo: 'I',
    ubicacion: 'Santa Tecla',
    modalidad: 'Híbrido',
    salario: '$2,200–$3,000',
    tag: 'AWS',
    categoria: 'Ingeniería',
    categoriaSlug: 'ingenieria',
    publicado: 'Hace 1 semana',
    descripcion:
      'InTelliSource El Salvador busca un DevOps Engineer para fortalecer la infraestructura cloud y los pipelines CI/CD del área de tecnología digital.',
    responsabilidades: [
      'Gestionar infraestructura en AWS con Terraform.',
      'Diseñar y mantener pipelines CI/CD.',
      'Monitorear disponibilidad y performance de sistemas.',
      'Colaborar con equipos de desarrollo en prácticas DevSecOps.',
    ],
    requisitos: [
      '3+ años en roles DevOps o SRE.',
      'Certificación AWS (deseable).',
      'Experiencia con Docker, Kubernetes.',
      'Conocimiento de seguridad cloud.',
    ],
    beneficios: [
      'Certificaciones pagadas.',
      'Seguro de salud familiar.',
      'Bono de desempeño semestral.',
    ],
  },
  {
    id: '7',
    titulo: 'Médico Ocupacional',
    empresa: 'Hospital de Diagnóstico',
    logo: 'H',
    ubicacion: 'San Miguel',
    modalidad: 'Presencial',
    salario: '$1,500–$2,000',
    tag: 'Salud',
    categoria: 'Salud',
    categoriaSlug: 'salud',
    publicado: 'Hace 3 días',
    descripcion:
      'El Hospital de Diagnóstico busca un Médico Ocupacional para gestionar el programa de salud laboral y bienestar de los colaboradores.',
    responsabilidades: [
      'Realizar evaluaciones médicas ocupacionales.',
      'Gestionar programas de vigilancia médica.',
      'Emitir informes y estadísticas de salud laboral.',
      'Coordinar con áreas de RRHH y Seguridad.',
    ],
    requisitos: [
      'Título de Médico Cirujano con segunda especialidad en Medicina Ocupacional.',
      'Registro en Junta de Vigilancia de la Profesión Médica.',
      'Experiencia mínima 2 años en el área.',
    ],
    beneficios: [
      'Beneficios de salud para la familia.',
      'Guardias remuneradas.',
      'Convenio educativo.',
    ],
  },
  {
    id: '8',
    titulo: 'Docente de Matemáticas',
    empresa: 'Colegio Bautista El Salvador',
    logo: 'C',
    ubicacion: 'San Salvador',
    modalidad: 'Presencial',
    salario: '$700–$1,000',
    tag: 'Educación',
    categoria: 'Educación',
    categoriaSlug: 'educacion',
    publicado: 'Hace 2 días',
    descripcion:
      'El Colegio Bautista busca un Docente de Matemáticas para nivel secundaria, comprometido con la excelencia académica y el desarrollo integral de los estudiantes.',
    responsabilidades: [
      'Impartir clases de Matemáticas en secundaria.',
      'Preparar material didáctico y evaluaciones.',
      'Participar en reuniones pedagógicas.',
      'Acompañar a estudiantes con dificultades.',
    ],
    requisitos: [
      'Título en Educación mención Matemáticas o Licenciatura en Matemáticas.',
      'Experiencia mínima 1 año en docencia.',
      'Habilidades comunicativas y empatía.',
    ],
    beneficios: [
      'Descuento en matrícula para hijos.',
      'Capacitaciones pedagógicas.',
      'Buen ambiente laboral.',
    ],
  },
  {
    id: '9',
    titulo: 'Marketing Digital Manager',
    empresa: 'Almacenes Simán',
    logo: 'A',
    ubicacion: 'San Salvador',
    modalidad: 'Híbrido',
    salario: '$1,500–$2,200',
    tag: 'Marketing',
    categoria: 'Marketing',
    categoriaSlug: 'marketing',
    publicado: 'Hace 6 días',
    descripcion:
      'Almacenes Simán busca un Marketing Digital Manager para liderar las estrategias de performance marketing y crecimiento digital del canal e-commerce.',
    responsabilidades: [
      'Gestionar campañas de SEM, SEO, Social Ads y Email.',
      'Analizar ROI y optimizar inversión en medios.',
      'Coordinar con agencias y equipos de contenido.',
      'Reportar KPIs a gerencia comercial.',
    ],
    requisitos: [
      '4+ años en marketing digital.',
      'Dominio de Google Ads, Meta Ads y Analytics.',
      'Experiencia en e-commerce.',
      'Habilidades analíticas y orientación a resultados.',
    ],
    beneficios: [
      'Descuento en compras Simán.',
      'Seguro médico.',
      'Bono por metas.',
    ],
  },
];

export const CATEGORIAS_META: Record<string, { label: string; color: string }> = {
  tecnologia: { label: 'Tecnología', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  diseno: { label: 'Diseño', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  finanzas: { label: 'Finanzas', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ingenieria: { label: 'Ingeniería', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  salud: { label: 'Salud', color: 'bg-red-50 text-red-700 border-red-200' },
  educacion: { label: 'Educación', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  retail: { label: 'Retail', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  marketing: { label: 'Marketing', color: 'bg-teal-50 text-teal-700 border-teal-200' },
};
