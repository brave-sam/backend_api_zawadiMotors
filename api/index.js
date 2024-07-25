const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const blogRoutes = require('./routes/blogRoutes');
const path = require('path');
const app = express();
// const PORT =  5000;
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
app.use('/api', carRoutes);
app.use('/api/blogs',blogRoutes);

mongoose.connect('mongodb+srv://vinitsiwach06:vinit123si@cluster.8zhkgak.mongodb.net/Testing', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
