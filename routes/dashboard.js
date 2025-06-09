// routes/dashboard.js
const express = require('express');
const router = express.Router();
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/admin/dashboard', requireRole('admin'), (req, res) => {
  res.send("Admin Dashboard - Manage users and jobs");
});

router.get('/employer/dashboard', requireRole('employer'), (req, res) => {
  res.send("Employer Dashboard - Post or edit jobs");
});

router.get('/jobs', requireRole('job_seeker'), (req, res) => {
  res.send("Job Seeker - Browse and apply for jobs");
});

module.exports = router;

