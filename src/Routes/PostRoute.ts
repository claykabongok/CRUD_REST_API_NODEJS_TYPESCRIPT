import { Router } from "express";
const router: Router = Router();
import * as PostController from "../Controllers/PostController";

//create post
router.post("/", PostController.CreatePost);

//get all post
router.get("/", PostController.getAllPost);

//get one post
router.get("/:postId", PostController.getPost);

//update post
router.patch("/", PostController.updatePost);

//delete post
router.delete("/:postId", PostController.detelePost);

export default router;
