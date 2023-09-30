const Router = require("express")
const postController = require("../controllers/postController")
const router = new Router()
const multer = require("multer")
const { v4: uuidv4 } = require('uuid');

const authMiddleware = require("../middleware/auth.middleware")
const {Post, PostPhoto} = require("../models/Posts")

const storage = multer.memoryStorage(); // You can adjust storage options as needed
const upload = multer({ storage });

// console.log("mkw",upload)

router.post('', authMiddleware, upload.single('photo'), async (req, res) => {
    try {
      const { name, title } = req.body;
  
      // Create a new CarPhoto instance
      const postPhoto = new PostPhoto({
        filename: uuidv4() + ".jpg",
        // contentType: ,
        // data: req.file.buffer, 
      });
  
      await postPhoto.save(); 
  
      // Create a new Car instance with name, title, and the reference to carPhoto
      const post = new Post({
        name,
        title,
        photo: postPhoto,
      });
  
      await post.save();
  
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating car:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// router.post('', authMiddleware, postController.postCreate)
router.post('/upload', authMiddleware, postController.avatar)
router.post('/just', authMiddleware, postController.justUploadPhoto)
router.get('', authMiddleware, postController.getFiles)

module.exports = router