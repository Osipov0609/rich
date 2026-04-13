const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const axios = require('axios');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.json());


// Import JSON data
const apartments = require("./apartament.json");
const house = require("./house.json");
const lot = require('./lot.json');
const realtor = require('./realtor.json');

const PORT = process.env.PORT || 5000;


app.get('/apartments', (req, res) => {
    const { rooms, building, furnishing, repair, type } = req.query;

    let filtered = apartments.filter(a => {
        return (!rooms || String(a.rooms) === String(rooms)) &&
            (!building || a.building === building) &&
            (!furnishing || a.furnishing === furnishing) &&
            (!repair || a.repair === repair) &&
            (!type || a.type === type);
    });

    res.json(filtered);
});

app.get('/houses', (req, res) => {
    const { rooms, type, propertyType, building, furnishing, repair } = req.query;

    let filtered = house.filter(a => {
        return (!rooms || a.rooms === rooms) &&
            (!propertyType || a.propertyType === propertyType) &&
            (!building || a.building === building) &&
            (!furnishing || a.furnishing === furnishing) &&
            (!repair || a.repair === repair) &&
            (!type || a.type === type);
    });
    res.json(filtered);
});

app.get('/lot', (req, res) => res.json(lot));
app.get('/realtor', (req, res) => res.json(realtor));

// --- Telegram Bot Integration ---
const TOKEN = "8756676669:AAHkKwSpy5NQLLoL03Slt9D_nlRgH6KVOoo";
const CHAT_ID = '939294728';
app.post('/li', async (req, res) => {
    const { message } = req.body;

    // Ստուգում ենք՝ արդյոք հաղորդագրությունը դատարկ չէ
    if (!message) {
        return res.status(400).send('Message is required');
    }

    try {
        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML' // Սա թույլ կտա օգտագործել <b> կամ <i> տեգերը Telegram-ում
        });
        res.status(200).send('Success');
    } catch (error) {
        // Եթե Telegram-ի սերվերը սխալ տա
        console.error('Telegram Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to send message to Telegram');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});