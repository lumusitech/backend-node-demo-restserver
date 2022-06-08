const { response } = require("express");

const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { loadFile } = require("../helpers/loadFile");
const { User, Product } = require("../models");

const loadFileController = async (req, res = response) => {
  try {
    // const name = await loadFile(req.files, ["txt", "md"], "txt");
    const name = await loadFile(req.files, undefined, "img");
    res.json({ name });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

// not recommended. Better load images to cloudinary or similar
const updateImageController = async (req, res) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `User with id ${id} is not exists` });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `Product with id ${id} is not exists` });
      break;

    default:
      return res.status(500).json("this validation is not implemented");
  }

  // Clean previous images
  if (model.img) {
    // delete img at server
    const imagePath = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  try {
    const name = await loadFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json(model);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const updateImageCloudinaryController = async (req, res) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `User with id ${id} is not exists` });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `Product with id ${id} is not exists` });
      break;

    default:
      return res.status(500).json("this validation is not implemented");
  }

  // Clean previous images
  if (model.img) {
    // delete img previously saved in cloudinary server

    // model.img --> "https://res.cloudinary.com/image/upload/v1/restserver/users/imageId.jpg"
    // model.img.split("/").pop() --> "imageId.jpg"
    // model.img.split("/").pop().split(".").shift() --> imageId

    const public_id = model.img.split("/").pop().split(".").shift();

    // No necessary use await in this case
    cloudinary.uploader.destroy(
      `restserver-node-fer-herrera/${collection}/${public_id}`
    );

    // by fer-herrera:
    // const nameArr = model.img.split("/");
    // const name = nameArr[nameArr.length - 1];
    // const [public_id] = name.split(".");
  }

  const { tempFilePath } = req.files.file;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
    folder: `restserver-node-fer-herrera/${collection}`,
  });

  model.img = secure_url;

  model.save();

  res.json(model);
};

const showImageController = async (req, res) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `User with id ${id} is not exists` });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `Product with id ${id} is not exists` });
      break;

    default:
      return res.status(500).json("this validation is not implemented");
  }

  // Clean previous images
  if (model.img) {
    // delete img at server
    const imagePath = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
  }

  const placeholderPath = path.join(__dirname, "../assets", "", "no-image.jpg");
  return res.sendFile(placeholderPath);
};

module.exports = {
  loadFileController,
  updateImageController,
  updateImageCloudinaryController,
  showImageController,
};
