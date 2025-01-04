// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/coins/calculate', (req, res) => {
    const { targetAmount, coinDenominations } = req.body;
    const result = calculateCoins(targetAmount, coinDenominations);
    res.json(result);
});

function calculateCoins(targetAmount, coinDenominations) {
    let remainingAmount = targetAmount;
    const result = [];
    coinDenominations.sort((a, b) => b - a); // Sort denominations from high to low

    for (const coin of coinDenominations) {
        while (remainingAmount >= coin) {
            result.push(coin);
            remainingAmount -= coin;
        }
    }

    return result;
}

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
