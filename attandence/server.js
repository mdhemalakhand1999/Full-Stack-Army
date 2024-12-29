const express = require('express');
const connectDB = require('./db');
const app = express();
const routes = require('./routes');
const authenticate = require('./middleware/authenticate');

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
    res.send('<h1>hello</h1>');
})

const PORT = 4040;

app.post('/private', authenticate, async (req, res) => {
    console.log('I am authenticated', req.user);
    return res.status(200).json({ message: 'I am a private route' });
})

connectDB('mongodb+srv://mdhemalakhand:MD_hemal_akhand123@cluster0.dglny.mongodb.net/attandence?retryWrites=true&w=majority&appName=attandenceApp').then(() => {
    console.log('database connected');
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    })
}).catch((e) => {
    console.log(e);
})