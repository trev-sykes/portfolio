import { ProjectPreview, Dependency, FullProject } from '../projectInterfaces'
import img from '../../../assets/crypto-scope.png'

const cryptoScopePreview : ProjectPreview =     {
    title: 'Crypto-Scope',
    description: 'Tool for charting crypto assets',
    date: 'August 23, 2023',
    languages: ["JavaScript", 'HTML','CSS'],
    frameworks: [],
    imageUrl: img,
    url: 'https://trevarious.github.io/Crypto-Scope/',
    gitLink: 'https://github.com/trevarious/Crypto-Scope?tab=readme-ov-file'
  }

const coinGecko : Dependency = {
    name: 'CoinGecko API',
    description: 'Provides real-time and historical cryptocurrency data'
}

const googleCharts : Dependency = {
    name: 'Google Charts Library',
    description: 'Renders charts for visualizing cryptocurrency price data.'
}
const dependencies = [coinGecko, googleCharts]

const cryptoScope : FullProject = {
    summary: 'A tool used to fetch and visualize cryptocurrency price data. This projects highlights an ability to manipulate and display real-time data in a dynamic way.',
    ...cryptoScopePreview,
    dependencies
}

export default cryptoScope;