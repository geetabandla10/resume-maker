import { templates, TemplateId } from './templates';

export default function ResumePreview({ data, templateId = 'standard' }: { data: any, templateId?: string }) {
    const SelectedTemplate = templates[templateId as TemplateId] || templates.standard;

    return (
        <div className="resume-preview-container">
            <SelectedTemplate data={data} />
        </div>
    );
}
