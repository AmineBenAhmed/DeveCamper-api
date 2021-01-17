const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'], //if we want a message is returned when field missed we use this form [true/flase, 'message']
    unique: [true, 'Please choose another name this name is tooken'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String, //if we write 'Dev Bootcamp' slag make it in this form 'dev-bootcamp' all becaome lowercase and space become '-'
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    //GeoJson Point
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  careers: {
    //array of strings
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10']
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGarantee: {
    type: Boolean,
    default: false
  },
  acceptedGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

//Create bootcamp slug from the name
BootcampSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  this.name = this.name.toLowerCase();
  next();
});

//put the name in uppercase after saved document
BootcampSchema.post('save', function() {
  this.name = this.name.toUpperCase();
});

//Geocode and create location field
BootcampSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  //Do not save address in DB
  this.address = undefined;
  next();
});

//cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function(next) { //this hook will only called when we delete a bootcamp using 'remove' method
  console.log(`Coureses being removed from bootcamp ${this.name} with ID: ${this._id}`);
  await this.model('Course').deleteMany({ bootcamp: this._id });
  next();
})

//Reverse populate with virtuals
BootcampSchema.virtual('courses', { //virtual field added to the bootcamp
  ref: 'Course', //schema to which refer the populated
  localField: '_id',//locally used field from the schema to refer to it
  foreignField: 'bootcamp',//the field used in the root schema 
  justOne: false//we have an array of courses in the bootcamp there fore in not one
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);