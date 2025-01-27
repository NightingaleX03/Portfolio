// Load environment variables
require("dotenv").config({ path: "config.env" });

const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const importProjects = require("./importProjects");

// MongoDB Connection URI
const Db = process.env.ATLAS_URI;

// Mongoose Schema and Model
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    blurb: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },
    images: [{ type: String }],
    date: { type: Date, default: Date.now },
    status: { type: String, default: "In Progress" },
    tags: [{ type: String }],
    what_it_does: { type: String },
    features: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    skills: [{ type: String }],
    next_steps: [{ type: String }],
    final_note: { type: String },
  },
  { collection: "project" }
);

const Project = mongoose.model("Project", projectSchema);

// Function to import projects
async function importProjectsToDatabase() {
  try {
    // Connect to MongoDB Atlas using Mongoose
    await mongoose.connect(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas");

    // Insert multiple projects into the database
    const existingProjects = await Project.find();
    if (existingProjects.length === 0) {
      await Project.insertMany(importProjects);
      console.log("Projects successfully imported to MongoDB Atlas");
    } else {
      console.log("Projects already exist in the database");
    }
  } catch (err) {
    console.error("Error importing projects:", err);
  } finally {
    // Disconnect from Mongoose
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB Atlas");
  }
}

// Run the import function
(async () => {
  await importProjectsToDatabase();
})();
