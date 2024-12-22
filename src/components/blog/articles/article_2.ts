import img from '../../../assets/article_2.jpeg';
import { Blog, BlogPreview, FullArticle } from '../articleInterfaces';

const blogPreview: BlogPreview = {
    title: 'CoinGecko API Tutorial',
    description: `Learn how to build a crypto price fetching tool using the CoinGecko API. This guide walks through setting up your environment, API integration, and building a user-friendly interface.`,
    date: 'February 4, 2024',
    topic: ['Cryptocurrency', 'Web Development', 'API Integration', 'JavaScript', 'Tutorial'],
    imageUrl: img
};

const fullArticle: FullArticle = {
    sections: [
        {
            title: 'Build a Crypto Price Fetching Tool',
            content: `In this tutorial, we will guide you through creating a cryptocurrency price tool using the CoinGecko API. You'll learn how to fetch real-time data, display it in a user-friendly format, and enhance the experience by allowing users to track their favorite coins.`
        },
        {
            title: 'Setting Up Environment',
            content: `First, make sure your development environment is ready:

            1. Install Node.js and npm
            2. Create a new React.js project using 'create-react-app'
            3. Initialize Git for version control
            4. Install necessary libraries like Axios for API requests`,
            codeBlocks: [
                {
                    language: 'bash',
                    code: `# Install create-react-app if you haven't already
npx create-react-app crypto-price-tool`
                },
                {
                    language: 'bash',
                    code: `# Install Axios for API requests
npm install axios`
                }
            ]
        },
        {
            title: 'API Integration',
            content: `To fetch live data, we will use the CoinGecko API. The API provides free access to real-time cryptocurrency data. You can make API requests to fetch prices, market data, and more. We'll use Axios to handle these requests.`,
            codeBlocks: [
                {
                    language: 'javascript',
                    code: `import axios from 'axios';

const fetchCryptoPrices = async () => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,ripple'
        }
    });
    return response.data;
};`
                }
            ]
        },
        {
            title: 'Front-end Development',
            content: `We will build a simple React.js interface that displays real-time crypto prices. This will include:

            1. A table displaying crypto prices
            2. A search feature for users to track specific coins
            3. Real-time data updates every minute`,
            codeBlocks: [
                {
                    language: 'javascript',
                    code: `import React, { useEffect, useState } from 'react';
import { fetchCryptoPrices } from './api';

const CryptoPrices = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const getPrices = async () => {
            const data = await fetchCryptoPrices();
            setPrices(data);
        };

        getPrices();
        const interval = setInterval(getPrices, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Real-time Crypto Prices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Price (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map(coin => (
                        <tr key={coin.id}>
                            <td>{coin.name}</td>
                            <td>{coin.current_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoPrices;`
                }
            ]
        },
        {
            title: 'Favorite Coins Feature',
            content: `Add a feature that allows users to save and track their favorite cryptocurrencies. This can be done by storing user preferences in local storage or using a database.`,
            codeBlocks: [
                {
                    language: 'javascript',
                    code: `const saveFavoriteCoin = (coinId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(coinId)) {
        favorites.push(coinId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};`
                }
            ]
        },
        {
            title: 'Testing and Deployment',
            content: `Before deploying your app, it's important to test the functionality. You can write automated tests using Jest or Cypress. After testing, deploy your app to a platform like Netlify or AWS.`,
            codeBlocks: [
                {
                    language: 'bash',
                    code: `# Run tests with Jest
npm run test`
                },
                {
                    language: 'bash',
                    code: `# Deploy to Netlify
netlify deploy`
                }
            ]
        },
        {
            title: 'Conclusion',
            content: `Congratulations! You've built a fully functional crypto price fetching tool that integrates with the CoinGecko API. You can now expand this tool by adding new features, such as more detailed coin data or multi-currency support.`
        }
    ],
    tableOfContents: [
        'API Integration',
        'Front-end Development',
        'Favorite Coins Feature',
        'Testing and Deployment',
        'Conclusion'
    ]
};

const article_2: Blog = {
    titleHeader: 'CoinGecko API Tutorial',
    ...blogPreview,
    ...fullArticle
};

export default article_2;
