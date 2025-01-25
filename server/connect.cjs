// Load environment variables
require('dotenv').config({ path: 'config.env' });

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

// MongoDB Connection URI
const Db = process.env.ATLAS_URI;

// Function to connect to MongoDB Atlas using the native MongoDB client
async function listCollections() {
  const client = new MongoClient(Db);

  try {
    // Connect to the database
    await client.connect();

    // Get all collections from the "Projects" database
    const collections = await client.db('Projects').collections();
    collections.forEach((collection) =>
      console.log(collection.s.namespace.collection)
    );
  } catch (e) {
    console.error('Error listing collections:', e);
  } finally {
    // Close the client connection
    await client.close();
  }
}

// Mongoose Schema and Model
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    blurb: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },
    images: [{ type: String }],
    longDescription: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { collection: 'project' }
);

const Project = mongoose.model('Project', projectSchema);

// Function to add a new project using Mongoose
async function addNewProject() {
  try {
    // Connect to MongoDB Atlas using Mongoose
    await mongoose.connect(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a new project instance
    const newProject = new Project({
      title: 'Atlas Project Title',
      blurb: 'This is a short description of the project',
      image: 'https://example.com/project-image.jpg',
      video: 'https://example.com/project-video.mp4',
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      longDescription: 'A detailed description of the project goes here.',
      date: new Date(), // Optional; defaults to current date
    });

    // Save the project to the database
    await newProject.save();
    console.log('Project successfully added to MongoDB Atlas');
  } catch (err) {
    console.error('Error adding project to MongoDB Atlas:', err);
  } finally {
    // Disconnect from Mongoose
    await mongoose.disconnect();
  }
}

// Run both functions
(async () => {
  await listCollections(); // Lists collections
  await addNewProject(); // Adds a new project
})();
