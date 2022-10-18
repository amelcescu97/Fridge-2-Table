const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

const nanoid = require('nanoid');

const dataBase = require('./dataBase');

app.use(cors());

app.get('/food', (req, res, next) => {
    res.json(dataBase.value());
});

app.put('/food', (req, res, next) => {
    const { title, id, itemCategory } = req.query;

    if (category === 'Missing-from-Fridge') {
        dataBase.get('Missing-from-Fridge')
            .push({
                title: title,
                itemCategory: itemCategory,
                id: nanoid(11),
            })
            .write();
        res.send(`Successfully added: ${title} in ${itemCategory}`);
    } else if (category === 'Already-in-Fridge') {
        dataBase.get('Already-in-Fridge')
            .push({
                title: title,
                itemCategory: itemCategory,
                id: nanoid(11),
            })
            .write();
        res.sendStatus(200);
        res.send(`Successfully added: ${title} in ${itemCategory}`);
    } else {
        res.status(404).send(
            `Could not add item because no category was selected`
        );
    }
});

app.delete('/food', (req, res, next) => {
    dataBase.get('Missing-from-Fridge')
        .remove({
            id: req.query.id,
        })
        .write();
    dataBase.get('Already-in-Fridge')
        .remove({
            id: req.query.id,
        })
        .write();
    res.send(`Deleted item with id: ${req.query.id}`);
});