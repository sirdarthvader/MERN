const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }, 
    handle: {
        type: String,
        required: true,
        max: 40
    },
    companny: {
        type: String,
        required: false
    }, 
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
    }, 
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            }, 
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            todate: {
                type: Date,
                required: false
            },
            current: {
                type: Boolean,
                default: false
            },
            decription: {
              type: String,
              required: false,
            }
        }
    ],
    eduation: [
      {
          school: {
              type: String,
              required: true
          },
          degree: {
              type: String,
              required: true
          }, 
          fieldofstudy: {
              type: String
          },
          from: {
              type: Date,
              required: true
          },
          todate: {
              type: Date,
              required: false
          },
          current: {
              type: Boolean,
              default: false
          },
          decription: {
            type: String,
            required: false,
          }
      }
  ],
  social: {
    youtube: {
      type: String,
      required: false
    },
    facebook: {
      type: String,
      required: false
    },
    linkedin: {
      type: String,
      required: false
    },
    twitter: {
      type: String,
      required: false
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);