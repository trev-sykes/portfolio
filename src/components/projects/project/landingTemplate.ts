import { ProjectPreview, Dependency, FullProject } from '../projectInterfaces'
import img from '../../../assets/landing-template.png'

const landingTemplatePreview : ProjectPreview =     {
    title: 'Landing-Template',
    description: 'Landing page template for a small bussiness',
    date: 'April 23, 2023',
    languages: ["JavaScript", 'HTML','CSS'],
    frameworks: [],
    imageUrl: img,
    url: 'https://trevarious.github.io/Boilerplate-Landing-Page/'
  }

const boxicons : Dependency = {
    name: 'Boxicons',
    description: 'A dependency for icons used in the navigation and footer sections'
}
const dependencies = [boxicons];

const landingTemplate : FullProject = {
    summary: 'A landing page template designed to be compatible with plenty of ecommerce sectors. CSS transitions are the main focus for this project, highlighting dynamic transitions are movement within the landing page.',
    ...landingTemplatePreview,
    dependencies
}

export default landingTemplate;