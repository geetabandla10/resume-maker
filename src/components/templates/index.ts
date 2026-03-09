import StandardTemplate from './StandardTemplate';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import CreativeTemplate from './CreativeTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import TechTemplate from './TechTemplate';
import ElegantTemplate from './ElegantTemplate';
import TwoColumnTemplate from './TwoColumnTemplate';
import BoldTemplate from './BoldTemplate';

export const templates = {
    standard: StandardTemplate,
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    creative: CreativeTemplate,
    minimalist: MinimalistTemplate,
    executive: ExecutiveTemplate,
    tech: TechTemplate,
    elegant: ElegantTemplate,
    two_column: TwoColumnTemplate,
    bold: BoldTemplate,
};

export type TemplateId = keyof typeof templates;

export const templateConfig = [
    { id: 'standard', name: 'Standard', description: 'Clean and traditional' },
    { id: 'modern', name: 'Modern', description: 'Sleek with color accents' },
    { id: 'professional', name: 'Professional', description: 'Bold and structured' },
    { id: 'creative', name: 'Creative', description: 'Artist-friendly layout' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean whitespace' },
    { id: 'executive', name: 'Executive', description: 'Dense and refined' },
    { id: 'tech', name: 'Tech', description: 'Terminal-inspired design' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated serif' },
    { id: 'two_column', name: 'Two Column', description: 'Sidebar-based layout' },
    { id: 'bold', name: 'Bold', description: 'High contrast design' },
];
