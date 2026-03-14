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
import HarvardTemplate from './HarvardTemplate';
import StartupTemplate from './StartupTemplate';
import CorporateTemplate from './CorporateTemplate';
import DeveloperTemplate from './DeveloperTemplate';
import CreativeProTemplate from './CreativeProTemplate';
import CleanTemplate from './CleanTemplate';
import TimelineTemplate from './TimelineTemplate';
import GridTemplate from './GridTemplate';
import SidebarTemplate from './SidebarTemplate';
import InfographicTemplate from './InfographicTemplate';
import CanvaMinimalTemplate from './CanvaMinimalTemplate';

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
    harvard: HarvardTemplate,
    startup: StartupTemplate,
    corporate: CorporateTemplate,
    developer: DeveloperTemplate,
    creative_pro: CreativeProTemplate,
    clean: CleanTemplate,
    timeline: TimelineTemplate,
    grid: GridTemplate,
    sidebar_pro: SidebarTemplate,
    infographic: InfographicTemplate,
    canva_minimal: CanvaMinimalTemplate,
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
    { id: 'harvard', name: 'Harvard', description: 'Classic Ivy League style' },
    { id: 'startup', name: 'Startup', description: 'Vibrant and modern' },
    { id: 'corporate', name: 'Corporate', description: 'Business professional' },
    { id: 'developer', name: 'Developer', description: 'Monospace for engineers' },
    { id: 'creative_pro', name: 'Creative Pro', description: 'High contrast artistic' },
    { id: 'clean', name: 'Clean', description: 'Minimalist and airy' },
    { id: 'timeline', name: 'Timeline', description: 'Career path focus' },
    { id: 'grid', name: 'Grid', description: 'Bento-style modular' },
    { id: 'sidebar_pro', name: 'Sidebar Pro', description: 'Professional left sidebar' },
    { id: 'infographic', name: 'Visual', description: 'Data-driven impact' },
    { id: 'canva_minimal', name: 'Canva Minimal', description: ' Grayscale infographic' },
];
