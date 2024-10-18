import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment,
    likePost,
    dislikePost,
    likeComment,
    dislikeComment,
    uploadVideo,
    uploadPDF,
    uploadAudio
  } from '../controller/BlogController.js';
  import { upload } from '../middleware/multerMiddleware.js';
  import express from 'express';

  export const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'documents', maxCount: 10 },
  ]);
  
  const router = express.Router();
  
  router.post('/posts', uploadFields, createPost);
  router.get('/posts', getAllPosts);
  router.get('/posts/:id', getPostById);
  router.put('/posts/:id',uploadFields, updatePost);
  router.delete('/posts/:id', deletePost);
  router.post('/posts/:id/comments', addComment);
  router.put('/posts/:id/comments/:commentId', updateComment);
  router.delete('/posts/:id/comments/:commentId', deleteComment);
  router.post('/posts/:id/like', likePost);
  router.post('/posts/:id/dislike', dislikePost);
  router.post('/comments/:commentId/like', likeComment);
  router.post('/comments/:commentId/dislike', dislikeComment);
  router.post('/upload/video', uploadFields,uploadVideo);
  router.post('/upload/pdf',uploadFields, uploadPDF);
  router.post('/upload/audio',uploadFields, uploadAudio);
  
  export default router;
  