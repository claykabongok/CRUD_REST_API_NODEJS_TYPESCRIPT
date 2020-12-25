import { Request, Response, NextFunction } from "express";
import Post from "../Models/Post";
import { Ipost } from "../Types/Ipost";
import { PostValidation } from "../Validations/PostValidation";

import {
  PostIdValidation,
  UpdatePostValidation,
} from "../Validations/PostValidation";
import { IUpadatePost } from "../Types/IUpadatePost";

/**
 * add new post
 * @param postModelValidation
 */
const addPost = async (postModelValidation: Ipost) => {
  try {
    const post = new Post({
      title: postModelValidation.title,
      description: postModelValidation.description,
      vote: postModelValidation.vote,
      user: postModelValidation.user,
    });
    const savedPost = await post.save();

    return savedPost;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create a new post
 * @param req
 * @param res
 * @param next
 */
export const CreatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postModelValidation: Ipost = await PostValidation.validateAsync(
      req.body
    );

    if (!postModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const newPost = await addPost(postModelValidation);
      if (newPost) {
        res.status(201).json({
          newPost,
        });
      } else {
        return next(
          res.status(400).json({
            message: "Invalid details provided.",
          })
        );
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Get all post
 * @param req
 * @param res
 * @param next
 */
export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getPosts = await Post.find()
      .select("_id title description vote createdAt updatedAt")
      .populate("user", "username name surname");

    if (getPosts) {
      res.status(200).json(getPosts);
    } else {
      return next(
        res.status(404).json({
          message: "Not found.",
        })
      );
    }
  } catch (error) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * get one post
 * @param req
 * @param res
 * @param next
 */
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postIdValidation = await PostIdValidation.validateAsync(
      req.params.postId
    );

    if (!postIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const getPosts = await Post.findById(postIdValidation)
        .select("_id title description vote createdAt updatedAt")
        .populate("user", "username name surname");

      if (getPosts) {
        res.status(200).json(getPosts);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * delete post
 * @param req
 * @param res
 * @param next
 */
export const detelePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postIdValidation = await PostIdValidation.validateAsync(
      req.params.postId
    );

    if (!postIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const deletePosts = await Post.findByIdAndDelete(postIdValidation);

      if (deletePosts) {
        res.status(200).json(deletePosts);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Update post
 * @param req
 * @param res
 * @param next
 */
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resUpdatePostValidation: IUpadatePost = await UpdatePostValidation.validateAsync(
      req.body
    );

    if (!UpdatePostValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const updatedPosts = await Post.findByIdAndUpdate(
        {
          _id: resUpdatePostValidation.postId,
        },
        {
          $set: {
            title: resUpdatePostValidation.title,
            description: resUpdatePostValidation.description,
          },
        }
      );

      if (updatedPosts) {
        res.status(200).json(updatedPosts);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};
