
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send('Email already registered. <a href="login">Login</a>');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.send(`
      <center><h1>Registration successful :) <a href="/login">Login here</a></center></h1>
      <script>setTimeout(() => { window.location.href = '/login'; }, 5000);</script>
    `);
  } catch (err) {
    console.error(err);
    res.send('Error during registration. <a href="/">Go Home</a>');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.send('User not found or role mismatch. <a href="login">Login</a>');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send('Invalid password. <a href="/">Go Home</a>');

    req.session.user = {
      _id: user._id,
      name: user.name,
      role: user.role
    };

    let redirectUrl = '/';
    if (role === 'admin') redirectUrl = '/admin/dashboard';
    else if (role === 'employer') redirectUrl = '/employer/dashboard';
    else if (role === 'job_seeker') redirectUrl = '/seeker/dashboard';
   


    res.send(`
      <center><h1 style="color: green;">Welcome ${user.name} (${user.role}) :)</h1></center>
      <script>setTimeout(() => { window.location.href = '${redirectUrl}'; }, 3000);</script>
    `);
  } catch (err) {
    console.error(err);
    res.send('Error during login. <a href="/">Go Home</a>');
  }
});
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout Error:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/');
  });
});

module.exports = router;
