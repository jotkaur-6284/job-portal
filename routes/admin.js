// const express = require('express');
// const router = express.Router();
// const Job = require('../models/Job');
// const User = require('../models/User');
// const Application = require('../models/Application');

// router.get('/dashboard', async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     const users = await User.find();
//     const applications = await Application.find();

//     const totalJobs = jobs.length;
//     const totalUsers = users.length;
//     const totalApplications = applications.length;

//     res.render('admin-dashboard', {
//       jobs,
//       users,
//       applications,
//       totalJobs,
//       totalUsers,
//       totalApplications
//     });
//   } catch (err) {
//     console.error(err);
//     res.send('Error loading admin dashboard.');
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');

router.get('/dashboard', async (req, res) => {
  try {
    const jobs = await Job.find();
    const users = await User.find();
    const applications = await Application.find().populate('jobId');

    res.render('admin-dashboard', {
      totalJobs: jobs.length,
      totalUsers: users.length,
      totalApplications: applications.length,
      jobs,
      users,
      allApplications: applications
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).send('Server error');
  }
});

// Example: Delete user route
router.post('/delete/user/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Similarly, add delete routes for jobs and applications if needed

module.exports = router;
