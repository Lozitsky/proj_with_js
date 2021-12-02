const express = require('express')
const app = express()
const port = 3000

app.get('/welcome', (request, response) => {
    // response.send("Here's the info you requested!")
    response.send({
        name: "Some name",
        birthday: "1980.10.11",
        quote: "If you wanna be a rich, you must gonna be a bitch"
    })
});

app.get('/date', (req, res) => {
    res.send(new Date().toLocaleDateString());
});

app.get('/myName', (req, res) => {
    res.send("Some Name");
});

app.get('/random', (req, res) => {
    res.send("" + Math.floor(Math.random() * 100 + 1));
});



app.listen(port, () => console.log(`Listening on port ${port}`))


