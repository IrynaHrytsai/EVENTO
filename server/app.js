const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


const eventsRoutes = require('./routes/events');
const registrationsRoutes = require('./routes/registrations');
const participantsRoutes = require('./routes/participants');
const contactRoutes = require('./routes/contact');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000', 
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the Events API');
});


app.use('/api/events', eventsRoutes);
app.use('/api/registrations', registrationsRoutes);
app.use('/api/participants', participantsRoutes);
app.use('/api/contact', contactRoutes);


mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,

})
.then(() => {
    console.log('MongoDB підключено');
})
.catch(err => {
    console.error('Помилка підключення до MongoDB:', err);
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Something broke!' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});


app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});
