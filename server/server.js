const express = require('express');
const cors = require('cors');
const path = require('path');
const apartments = require("./apartament.json");
const house = require("./house.json");
const lot = require('./lot.json')
const realtor = require('./realtor.json')
const axios = require('axios')

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const imagesPath = path.join(__dirname, '../front/src/images');
app.use('/images', express.static(imagesPath));

app.get('/apartments', (req, res) => {
    const { rooms, building, furnishing, repair, type } = req.query;

    let filtered = apartments.filter(a => {
        return (!rooms || a.rooms === rooms) &&
            (!building || a.building === building) &&
            (!furnishing || a.furnishing === furnishing) &&
            (!repair || a.repair === repair) &&
            (!type || a.type === type);
    });

    res.json(filtered);
});

app.get('/houses', (req, res) => {
    const { rooms, type, propertyType, building, furnishing, repair } = req.query
    let filtreted = house.filter(a => {

        return (!rooms || a.rooms === rooms) &&
            (!propertyType || a.propertyType === propertyType) &&
            (!building || a.building === building) &&
            (!furnishing || a.furnishing === furnishing) &&
            (!repair || a.repair === repair) &&
            (!type || a.type === type);
    })
    res.json(filtreted)
})

app.get('/lot',(req,res) => {
   res.json(lot);
})
app.get('/realtor', (req,res) => {
    res.json(realtor)
})


const TOKEN = "8756676669:AAHkKwSpy5NQLLoL03Slt9D_nlRgH6KVOoo";
const CHAT_ID = '939294728';
app.post('/li', async (req, res) => {
    const { message } = req.body;
    
    try {
        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });
        console.log('Հաղորդագրությունը ուղարկվեց Telegram-ին');
        res.status(200).send('Հաջողություն');
    } catch (error) {
        console.log('Սխալ Telegram-ի հետ կապի ժամանակ');
        res.status(500).send('Սխալ');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:5000`);
});