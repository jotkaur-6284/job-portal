const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');

function ensureSeeker(req, res, next) {
  if (req.session.user && req.session.user.role === 'job_seeker') next();
  else res.redirect('/login');
}

// Dashboard
router.get('/dashboard', ensureSeeker, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.session.user._id }).populate('jobId');
    res.render('seeker-dashboard', { applications });
  } catch (error) {
    console.error('Seeker Dashboard Error:', error);
    res.status(500).send('Server Error');
  }
});

// Cancel Application
router.post('/cancel/:id', ensureSeeker, async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.redirect('/seeker/dashboard');
  } catch (error) {
    console.error('Cancel Error:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
