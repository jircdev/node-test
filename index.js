const express = require('express');
const app = express();
const port = 3000;
const {join} = require('path');

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'instructions.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
