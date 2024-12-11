const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/form-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model
const questionSchema = new mongoose.Schema({
  title: String,
  questions: Array,
});

const QuestionForm = mongoose.model('QuestionForm', questionSchema);

// Routes
app.get('/forms', async (req, res) => {
  try {
    const forms = await QuestionForm.find();
    res.json(forms);
  } catch (err) {
    res.status(500).send('Error retrieving forms');
  }
});

app.post('/forms', async (req, res) => {
  try {
    const form = new QuestionForm(req.body);
    await form.save();
    res.status(201).send('Form saved successfully');
  } catch (err) {
    res.status(500).send('Error saving form');
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
