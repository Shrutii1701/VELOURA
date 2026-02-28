const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Express Minimal Healthy'));
app.listen(8080, () => console.log('Express Minimal running on 8080'));
