const path = require;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//schema
const Schema = mongoose.Schema;

const socialMediaSchema = new Schema({
  facebook: {
    type: String,
    required: true,
  },
  linkedIn: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
});

const leadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
const Lead = mongoose.model("Lead", leadSchema);

//API endpoints
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Fetch social media links
app.get("/api/social-media", (req, res) => {
  SocialMedia.findOne()
    .then((socialMedia) => {
      res.json(socialMedia);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update social media links
app.put("/api/social-media", (req, res) => {
  SocialMedia.findOne()
    .then((socialMedia) => {
      socialMedia.facebook = req.body.facebook;
      socialMedia.linkedIn = req.body.linkedIn;
      socialMedia.instagram = req.body.instagram;

      socialMedia
        .save()
        .then(() => res.json("Social media links updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Fetch leads data
app.get("/api/leads", (req, res) => {
  Lead.find()
    .then((leads) => {
      res.json(leads);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add a new lead
app.post("/api/leads", (req, res) => {
  const newLead = new Lead({
    name: req.body.name,
    contactNumber: req.body.contactNumber,
  });

  newLead
    .save()
    .then(() => res.json("New lead added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
