import express from "express";
import UsersModel from "../../db/modals/usersModal/users.js";
import { authMiddleware } from "../../auth/user.js";

const { Router } = express;

const router = Router();

router
  .route("/")
  .post(async (req, res, next) => {
    try {
      const createUser = new UsersModel(req.body);

      if (createUser) {
        await createUser.save();

        res.status(201).send({ success: true, user: createUser._id });
      } else {
        res.status(400).send({
          success: false,
          message: "Something Went Wrong in the creation of the user",
        });
      }
    } catch (error) {
      res.status(400).send({ success: false, error: error.message });
    }
  })
  .get(authMiddleware , async (req, res) => {
    try {
      const allUsers = await UsersModel.find();

      if (allUsers) {
        res.status(200).send({ success: true, data: allUsers });
      } else {
        res.status(404).send({ success: false, message: "No Users Found" });
      }
    } catch (error) {
      res.status(400).send({ success: false, error: error.message });
    }
  });

router
  .route("/:userId")
  .get(async (req, res) => {
    try {
      const userById = await UsersModel.findById(req.params.userId);

      if (userById) {
        res.status(200).send({ success: true, data: userById });
      } else {
        res
          .status(404)
          .send({ success: false, message: "User with that id Not Found" });
      }
    } catch (error) {
      res.status(404).send({ success: false, error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const modifyedUser = await UsersModel.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );

      if (modifyedUser) {
        res.status(203).send({ success: true, data: modifyedUser });
      } else {
        res
          .status(404)
          .send({ success: false, message: "User with that id Not Found" });
      }
    } catch (error) {
      res.status(404).send({ success: false, error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const userByIdDelete = await UsersModel.findByIdAndDelete(
        req.params.userId
      );

      if (userByIdDelete) {
        res
          .status(204)
          .send({ success: true, deleted: "User has been deleted" });
      } else {
        res
          .status(404)
          .send({ success: false, message: "User with that id Not Found" });
      }
    } catch (error) {
      res.status(404).send({ success: false, error: error.message });
    }
  });

export default router;
