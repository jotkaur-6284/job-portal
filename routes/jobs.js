

const express = require('express');
const Job = require('../models/Job');
const Application = require('../models/Application');

module.exports = function(upload) {
  const router = express.Router();

  // GET /jobs?search=... — List jobs with optional search
  router.get('/', async (req, res) => {
    const search = req.query.search || '';
    try {
      const jobs = await Job.find({ title: { $regex: search, $options: 'i' } });
      res.render('jobs', { jobs, search });
    } catch (err) {
      console.error('Error fetching jobs:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  // GET /jobs/apply/:id — Show application form for a job
  router.get('/apply/:id', async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).send('Job not found');
      }
      res.render('apply', { job });
    } catch (err) {
      console.error('Invalid job ID:', err);
      res.status(400).send('Invalid job ID');
    }
  });

  // POST /jobs/apply/:id — Handle job application with resume upload
  router.post('/apply/:id', upload.single('resume'), async (req, res) => {
    try {
      // Validate required fields
      const { fullName, email, coverLetter } = req.body;
      if (!fullName || !email) {
        return res.status(400).send('Full name and email are required');
      }

      const jobId = req.params.id;
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).send('Job not found');
      }

      // Resume file handling
      let resumeFile = null;
      if (req.file) {
        resumeFile = req.file.filename;
      } else {
        return res.status(400).send('Resume file is required');
      }

      await Application.create({
        jobId,
        name: fullName,
        email,
        coverLetter: coverLetter || '',
        resume: resumeFile,
        appliedAt: new Date()
      });

      res.send(`
        <center>
          <h2>✅ Application submitted successfully!</h2>
          <p>Redirecting to jobs list...</p>
        </center>
        <script>
          setTimeout(() => {
            window.location.href = '/jobs';
          }, 3000);
        </script>
      `);
    } catch (err) {
      console.error('Error saving application:', err);
      res.status(500).send('Error saving application');
    }
  });

  return router;
};
