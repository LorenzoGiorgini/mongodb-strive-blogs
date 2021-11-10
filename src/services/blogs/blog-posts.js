import express from "express"
import BlogPost from "../../db/modals/BlogPost.js"
const { Router } = express

const router = Router()


//Blog Posts routes
router.route("/")
                .get(async (req, res) => {
                    try {
                        const getAllBlogPosts = await BlogPost.find()
                        
                        res.status(200).send({success: true, data: getAllBlogPosts})

                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })
                .post(async (req, res) => {
                    try {
                        const newBlogPost = new BlogPost(req.body)

                        await newBlogPost.save()

                        res.status(201).send({success: true, createdPost: newBlogPost._id})

                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })


router.route("/:blogId")
                .get(async (req, res) => {
                    try {
                        const getBlogPostById = await BlogPost.findById(req.params.blogId)
                        res.status(200).send({success: true, data: getBlogPostById})
                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })
                .put(async (req, res) => {
                    try {
                        const updateBlogPostById = await BlogPost.findByIdAndUpdate(req.params.blogId, req.body, {new: true})
                        res.status(200).send({success: true, data: updateBlogPostById})
                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })
                .delete(async (req, res) => {
                    try {
                        const updateBlogPostById = await BlogPost.findByIdAndDelete(req.params.blogId)
                        res.status(204).send({success: true, message: "Deleted Successfully"})
                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })

//Comments routes

/*
GET /blogPosts/:id/comments/:commentId=> returns a single comment for the specified blog post
POST /blogPosts/:id => adds a new comment for the specified blog post
PUT /blogPosts/:id/comment/:commentId => edit the comment belonging to the specified blog post
DELETE /blogPosts/:id/comment/:commentId=> delete the comment belonging to the specified blog post */


/* GET /blogPosts/:id/comments => returns all the comments for the specified blog post */

router.route("/:blogPostId/comments")
                .get(async (req, res) => {
                    try {
                        const getAllBlogPosts = await BlogPost.findById(req.params.blogPostId)

                        if(getAllBlogPosts) {

                            res.status(200).send({success: true, data: getAllBlogPosts.comments})

                        } else {

                            res.status(404).send({success: false, error: error.message})

                        }
                    } catch (error) {

                        res.status(404).send({success: false, errorr: error.message})

                    }
                })
                .post(async (req, res) => {
                    try {
                        const newBlogPost = new BlogPost(req.body)

                        await newBlogPost.save()

                        res.status(201).send({success: true, createdPost: newBlogPost._id})

                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })


router.route("/:blogPostId/commentId")
                .get(async (req, res) => {
                    try {
                        const getBlogPostById = await BlogPost.findById(req.params.blogId)
                        res.status(200).send({success: true, data: getBlogPostById})
                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })
                .put(async (req, res) => {
                    try {
                        const updateBlogPostById = await BlogPost.findByIdAndUpdate(req.params.blogId, req.body, {new: true})
                        res.status(200).send({success: true, data: updateBlogPostById})
                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })
                .delete(async (req, res) => {
                    try {
                        const updateBlogPostById = await BlogPost.findByIdAndDelete(req.params.blogId)
                        res.status(204).send({success: true, message: "Deleted Successfully"})
                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })



export default router