export interface ImpactMetric {
  id: string;
  value: string;
  label: string;
  context: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export type ProjectCategory = '0-to-1 Launch' | 'Platform & Scale' | 'Growth';
export type DocumentFormat = 'Google Doc' | 'Google Slides' | 'Canva' | 'PPTX' | 'DOCX' | 'PDF';

export interface ProductProject {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  role: string;
  company: string;
  headlineMetric: string;
  projectType?: string;
  benefit?: string;
  imageUrl: string;
  documentUrl?: string;
  documentName?: string;
  documentFormat?: DocumentFormat;
  summary: string;
  problem: string;
  strategy: string;
  execution: string;
  outcomes: string[];
  artifacts: string[];
  featured?: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  details: string;
}

export interface CompetencyPillar {
  id: string;
  title: string;
  description: string;
  methods: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    location: string;
    availability: string;
    headline: string;
    subheadline: string;
    portraitUrl: string;
    email: string;
    phone: string;
    linkedinUrl: string;
    githubUrl: string;
    websiteUrl: string;
    philosophyTitle: string;
    philosophyBody: string;
  };
  metrics: ImpactMetric[];
  experiences: WorkExperience[];
  projects: ProductProject[];
  education: EducationItem[];
  competencies: CompetencyPillar[];
}
