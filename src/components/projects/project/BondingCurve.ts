import { ProjectPreview, Dependency, FullProject } from '../projectInterfaces'
import img from '../../../assets/bonding-curve.png'

const bondingCurveSimulatorPreview: ProjectPreview = {
    title: 'Bonding Curve Simulator',
    description: 'A visualization of price movement using a Bonding Curve function',
    date: 'December 8th, 2024',
    languages: ["JavaScript", 'HTML', 'CSS'],
    frameworks: ["React"],
    imageUrl: img,
    url: 'https://bonding-curve-asset-simulator.vercel.app/',
    gitLink: 'https://github.com/trevarious/BondingCurveAssetSimulator'
}



const reCharts: Dependency = {
    name: 're Charts',
    description: 'React library used for simple chart rendering.'
}
const dependencies = [reCharts]

const bondingCurveSimulator: FullProject = {
    summary: 'A price simulator that uses a bonding curve algo to determine price. Trades happen at random and you see the reflection of the collecvtive trades in the form of a price line chart and volume bar chart. ',
    ...bondingCurveSimulatorPreview,
    dependencies
}

export default bondingCurveSimulator;