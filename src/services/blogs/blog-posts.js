import express from "express"
import BlogPost from "../../db/modals/blogPostsModal/BlogPost.js"
import q2m from "query-to-mongo"

const { Router } = express

const router = Router()


//Blog Posts routes
router.route("/")
                .get(async (req, res) => {

                    try {
                        const mongoQuery = q2m(req.query)

                        const total = await BlogPost.countDocuments(mongoQuery.criteria)

                        const blogPosts = await BlogPost.find(mongoQuery.criteria)
                            .limit(mongoQuery.options.limit)
                            .skip(mongoQuery.options.skip)
                            .populate({path: "user" , select: "name surname"})

                        res.send({ links: mongoQuery.links("/blogPosts", total), pageTotal: Math.ceil(total / mongoQuery.options.limit), total, blogPosts })

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
GET /blogPosts/:id/comments => returns all the comments for the specified blog post
GET /blogPosts/:id/comments/:commentId=> returns a single comment for the specified blog post
POST /blogPosts/:id => adds a new comment for the specified blog post
PUT /blogPosts/:id/comment/:commentId => edit the comment belonging to the specified blog post
DELETE /blogPosts/:id/comment/:commentId=> delete the comment belonging to the specified blog post 
*/




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
                        const getBlogPost = await BlogPost.findById(req.params.blogPostId)

                        if(getBlogPost) {

                            const comment = {...req.body, postedAt: new Date()}

                            getBlogPost.comments.push(comment)

                            await getBlogPost.save()

                            res.status(201).send({success: true, data: getBlogPost.comments})
                        } else {
                            res.status(404).send({success: false, message: "Blog Post not found"})
                        }
                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})
                    }
                })


router.route("/:blogPostId/comments/:commentId")
                .get(async (req, res) => {
                    try {
                        const getBlogPostById = await BlogPost.findById(req.params.blogPostId)

                        if(getBlogPostById) {

                            const singleCommentById = getBlogPostById.comments.find(comment => comment._id.toString() === req.params.commentId)

                            if(singleCommentById) {
                                res.status(200).send({success: true, data: singleCommentById})
                            } else {
                                res.status(404).send({success: false, message: "Comment not found"})
                            }
                        } else {

                            res.status(404).send({success: false, message: "Comment not found"})
                        }
                    } catch (error) {

                        res.status(404).send({success: false, errorr: error.message})

                    }
                })
                .put(async (req, res) => {
                    try {
                        let getBlogPostById = await BlogPost.findById(req.params.blogPostId)


                        if(getBlogPostById) {
                            let commentIndex = getBlogPostById.comments.findIndex(comment => comment._id.toString() === req.params.commentId)

                            getBlogPostById.comments[commentIndex] = {...getBlogPostById.comments[commentIndex].toObject() , ...req.body, updatedAt: new Date()}


                            await getBlogPostById.save()

                            res.status(200).send({success: true, data: getBlogPostById.comments[commentIndex]})
                        } else {    
                            res.status(404).send({success: false, message: "Comment not found"})

                        }

                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})

                    }
                })
                .delete(async (req, res) => {
                    try {
                        const deleteComment = await BlogPost.findByIdAndUpdate(
                            req.params.blogPostId,
                            { $pull: { comments: { _id: req.params.commentId } } },
                            { new: true } 
                        )
                        if (deleteComment) {
                            res.status(204).send({success: true, message: "Comment deleted"})

                        } else {
                            res.status(404).send({success: false, message: "Comment Not Found"})

                        }
                    } catch (error) {
                        res.status(404).send({success: false, errorr: error.message})

                    }
                })



export default router