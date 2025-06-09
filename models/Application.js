const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', 
    required: true 
  },
  applicantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false
  },
  name: String,
  email: String,
  coverLetter: String,
  resume: Buffer,
  resumeType: String,
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);