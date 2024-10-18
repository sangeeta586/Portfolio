import { Comment, Category, BlogPost } from '../models/Blog.js';
import uploadOnCloudinary from "../utils/cloudinary.js"
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { StatusCodes } from 'http-status-codes';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPost = async (req, res) => {
  try {
    const { title, content, author, categories } = req.body;

    let imageCloudinaryUrl = null;
    let videoCloudinaryUrl = null;
    let audioCloudinaryUrl = null;
    let documentUrls = [];

    // Ensure categories is an array
    let categoryArray = Array.isArray(categories) ? categories : [categories];

    // Handle image upload to Cloudinary
    if (req.files && req.files.image && req.files.image.length > 0) {
      const imageLocalPath = req.files.image[0].path;
      const result = await uploadOnCloudinary(imageLocalPath);
      
      imageCloudinaryUrl = result.url;
    }

    // Handle video upload to Cloudinary
    if (req.files && req.files.video && req.files.video.length > 0) {
      const result = await uploadOnCloudinary(req.files.video[0].path, {
        folder: 'blog_videos',
        resource_type: 'video',
      });
      videoCloudinaryUrl = result.url;
    }

    // Handle audio upload to Cloudinary
    if (req.files && req.files.audio && req.files.audio.length > 0) {
      const result = await uploadOnCloudinary(req.files.audio[0].path, {
        folder: 'blog_audio',
        resource_type: 'audio',
      });
      audioCloudinaryUrl = result.url;
    }

    // Handle documents upload to Cloudinary
    if (req.files && req.files.documents && req.files.documents.length > 0) {
      for (const file of req.files.documents) {
        const result = await uploadOnCloudinary(file.path, {
          folder: 'blog_documents',
          resource_type: 'raw', // raw for documents like PDFs
        });
        documentUrls.push({ title: file.originalname, url: result.url });
      }
    }

    // Find or create categories by name
    const categoryIds = await Promise.all(
      categoryArray.map(async (categoryName) => {
        let category = await Category.findOne({ name: categoryName });
        if (!category) {
          category = new Category({ name: categoryName });
          await category.save();
        }
        return category._id;
      })
    );

    // Create the blog post document
    const newPost = new BlogPost({
      title,
      content,
      author,
      categories: categoryIds, // Use the ObjectId array for categories
      image: imageCloudinaryUrl,
      video: videoCloudinaryUrl,
      audio: audioCloudinaryUrl,
      documents: documentUrls,
    });

    // Save the post
    await newPost.save();

    // Return the created post
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};





// Get all blog posts
 export const  getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author categories');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Get a blog post by ID
 export const  getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author categories comments.author');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};



export const updatePost = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded Files:', req.files);
    
    const { title, content, categories } = req.body;
    let updateFields = {};

    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    const uploadFiles = async (file, folder, resourceType) => {
      const result = await uploadOnCloudinary(file.path, {
        folder,
        resource_type: resourceType,
      });
      return result.url;
    };

    if (req.files) {
      const { image, video, audio, documents } = req.files;

      if (image && image.length > 0) {
        updateFields.image = await uploadFiles(image[0], 'blog_images', 'image');
      }

      if (video && video.length > 0) {
        updateFields.video = await uploadFiles(video[0], 'blog_videos', 'video');
      }

      if (audio && audio.length > 0) {
        updateFields.audio = await uploadFiles(audio[0], 'blog_audio', 'audio');
      }

      if (documents && documents.length > 0) {
        let documentUrls = [];
        for (const file of documents) {
          const documentUrl = await uploadFiles(file, 'blog_documents', 'raw');
          documentUrls.push({ title: file.originalname, url: documentUrl });
        }
        updateFields.documents = documentUrls;
      }
    }

    console.log('Categories:', categories);
    if (categories) {
      const categoryArray = Array.isArray(categories) ? categories : [categories];
      const categoryIds = await Promise.all(
        categoryArray.map(async (categoryName) => {
          let category = await Category.findOne({ name: categoryName });
          if (!category) {
            category = new Category({ name: categoryName });
            await category.save();
          }
          return category._id;
        })
      );
      updateFields.categories = categoryIds;
    }

    console.log('Update Fields:', updateFields);
    const post = await BlogPost.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};




// Delete a blog post
 export const  deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

// Add a comment to a blog post
 export const  addComment = async (req, res) => {
  try {
    const { name,email, content } = req.body;
    const comment = new Comment({ name,email, content });
    const post = await BlogPost.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

// Update a comment
 export const  updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await BlogPost.findOneAndUpdate(
      { 'comments._id': req.params.commentId },
      { $set: { 'comments.$.content': content } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

// Delete a comment
 export const  deleteComment = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: { _id: req.params.commentId } } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};

// Like a blog post
 export const  likePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
};

// Dislike a blog post
 export const  dislikePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error disliking post', error });
  }
};

// Like a comment
 export const  likeComment = async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { 'comments._id': req.params.commentId },
      { $inc: { 'comments.$.likes': 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment', error });
  }
};

// Dislike a comment
 export const  dislikeComment = async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { 'comments._id': req.params.commentId },
      { $inc: { 'comments.$.dislikes': 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error disliking comment', error });
  }
};

// Upload video (placeholder for actual implementation)
 export const  uploadVideo = async (req, res) => {
  try {
    // Handle video upload logic here
    res.status(200).json({ message: 'Video uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading video', error });
  }
};

// Upload PDF (placeholder for actual implementation)
 export const  uploadPDF = async (req, res) => {
  try {
    // Handle PDF upload logic here
    res.status(200).json({ message: 'PDF uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading PDF', error });
  }
};

// Upload audio (placeholder for actual implementation)
 export const  uploadAudio = async (req, res) => {
  try {
    // Handle audio upload logic here
    res.status(200).json({ message: 'Audio uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading audio', error });
  }
};
