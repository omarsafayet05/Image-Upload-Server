const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

dotenv.config();
const app = express();
app.use(cors());

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "di8rfmavc",
  api_key: "747893666154955",
  api_secret: "xs10xVizJ21SB-t7XsSH5jIp7BY",
});

const storage = multer.diskStorage({});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Image-upload-preview is running");
});

// image upload route
app.post("/upload", upload.single("file"), async function (req, res) {
  try {
    if (!req?.file?.path) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const imageUrl = result.secure_url;

    // you can store imageUrl in your db

    res.json({ message: "Image uploaded successfully!", url: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Image-upload-preview running on ${port}`);
});
//xs10xVizJ21SB-t7XsSH5jIp7BY
//747893666154955

//Media-database
