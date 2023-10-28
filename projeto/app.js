const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
app.set('views', path.join(__dirname, 'views'));
const hbs = exphbs.create({}); // Crie uma instância de express-handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
  console.log(`O Express está rodando na porta ${PORT}`);
});

// db connection
db
  .authenticate()
  .then(() => {
    console.log('Conectou ao banco');
  })
  .catch(err => {
    console.log('Ocorreu um erro', err);
  });

// Routes
app.get('/', (req, res) => {

  let search = req.query.job;
  let query = '%'+search+'%'; // Ph => PHP , WordPress , Press > wordpress

  if(!search) {
  Job.findAll({order: [
    ['createdAt', 'DESC']
  ]})
  .then(jobs => {
    res.render('index',{
      jobs
    });
  })
   .catch(err => console.log(err));
} else {
  Job.findAll({
    where:{title:{[Op.like]: query}},
    order: [
    ['createdAt', 'DESC']
  ]})
  .then(jobs => {
    res.render('index', {
      jobs, search
    });
});
}});


// Jobs routes
app.use('/jobs', require('./routes/jobs'));