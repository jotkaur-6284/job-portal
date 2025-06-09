
// ---------------------------- server.js ----------------------------
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');
const session = require('express-session');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true
}));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image and PDF files are allowed!'));
  }
};
const upload = multer({ storage, fileFilter });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Pass user data to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
const indexRoutes = require('./routes/index');
const jobsRouter = require('./routes/jobs')(upload);
const adminRouter = require('./routes/admin');
const employerRouter = require('./routes/employer');
const seekerRouter = require('./routes/seeker');

app.use('/', indexRoutes);
app.use('/jobs', jobsRouter);
app.use('/admin', adminRouter);
app.use('/employer', employerRouter);
app.use('/seeker', seekerRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
