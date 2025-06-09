const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

function ensureEmployer(req, res, next) {
  if (req.session.user && req.session.user.role === 'employer') next();
  else res.redirect('/login');
}

router.get('/dashboard', ensureEmployer, async (req, res) => {
  try {
    const employerId = req.session.user._id;
    const jobs = await Job.find({ postedBy: employerId });
    res.render('employer-dashboard', { jobs });
  } catch (error) {
    console.error("Employer Dashboard Error:", error);
    res.status(500).send('Server error');
  }
});

router.get('/add-job', ensureEmployer, (req, res) => {
  res.render('employer-add-job');
});

router.post('/add-job', ensureEmployer, async (req, res) => {
  try {
    const employerId = req.session.user._id;
    const { title, company, description, location, salary } = req.body;

    const newJob = new Job({
      title,
      company,
      description,
      location,
      salary,
      postedBy: employerId,
      createdAt: new Date(),
    });

    await newJob.save();
    res.redirect('/employer/dashboard');
  } catch (error) {
    console.error("Add Job Error:", error);
    res.status(500).send('Server error');
  }
});

router.get('/edit-job/:id', ensureEmployer, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send('Job not found');
    res.render('employer-edit-job', { job });
  } catch (error) {
    console.error("Edit Job GET Error:", error);
    res.status(500).send('Server error');
  }
});

router.post('/edit-job/:id', ensureEmployer, async (req, res) => {
  try {
    const { title, company, description, location, salary } = req.body;
    await Job.findByIdAndUpdate(req.params.id, {
      title,
      company,
      description,
      location,
      salary,
    });
    res.redirect('/employer/dashboard');
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).send('Server error');
  }
});

router.post('/delete/job/:id', ensureEmployer, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.redirect('/employer/dashboard');
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
