import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import storyRoutes from "./routes/stories.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import fs from 'fs';
import  {Octokit} from '@octokit/rest';

const app = express();

// Create an Octokit instance with your personal access token
const octokit = new Octokit({ auth: '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' });

// Define the repository owner and name
const owner = 'Parathps7';
const repo = 'Images_by_users';

// Define the path to the folder where you want to upload images
const path = '';

app.use(cors());




async function uploadImage(imageName) {
  const filePath = `../client/public/upload/${imageName}`;
  const content = fs.readFileSync(filePath, { encoding: 'base64' });

  try {
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: `${path}${imageName}`,
      message: 'Upload image',
      content: content,
      encoding: 'base64'
    });
    
    console.log('File uploaded successfully:', response.data);
    // The response data contains information about the uploaded file
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//CORS
// app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //   res.header('Access-Control-Allow-Credentials', true); // Set to true to allow credentials
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   next();
  // });
  
  
  
  // // TO send as JSON
  // app.use(express.json(lim));

  app.use(cors({
    origin: 'https://lifeloop-final-deplay.vercel.app', // Replace this with the origin of your client application
    credentials: true
  }));
  app.use(express.json({ limit: '8mb' }));
  
  
  app.use(cookieParser());
  
  
  
  
  
  const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  uploadImage(file.filename);
  res.status(200).json(file.filename);
});




app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen( 8800, () => {
  console.log("API working!");
});

