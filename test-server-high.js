const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello World'));
app.listen(45678, () => console.log('Minimal server running on port 45678'));
