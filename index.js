const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/database'));
app.use('/database', require('./routes/database'));

// homepage route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'To-Do List'
  });
})

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));