const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const path = require('path');


router.get('/add', (req, res) => {
    res.render('layouts/add');
  });


// add job via post
router.post('/add', (req, res) => {
    let {title, salary, company, description, email, new_job} = req.body;
    // insert
    Job.create({
        
        title,
        salary,
        description,
        company,
        email,
        new_job,
       



    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

//router.use('/jobs', require('./routes/jobs'));
module.exports = router