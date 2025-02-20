const mongoose = require('mongoose');
const { Schema } = mongoose;

// Education Schema
const educationSchema = new Schema({
  degree: {
    type: String,
    required: true
  },
  branch: {
    type: String,

},
  institution: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

// Experience Schema
const experienceSchema = new Schema({
  job_title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    default: null  // null would indicate current job
  }
});

// Main Profile Schema
const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
   
    lowercase: true,
    trim: true
  },
  education: [educationSchema],  // Array of education records
  experience: [experienceSchema],  // Array of experience records
  summary: {
    type: String,
    default: ''
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Create indexes for better query performance
profileSchema.index({ email: 1 });
profileSchema.index({ 'experience.company': 1 });

const Applicant = mongoose.model('Applicant', profileSchema);

module.exports = Applicant;