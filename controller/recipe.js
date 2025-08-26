const Recipes = require("../models/recipe");
const multer = require("multer");
const path = require("path");

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    return res.json(recipes);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching recipes" });
  }
};

// Get single recipe
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    return res.status(400).json({ message: "Invalid recipe ID" });
  }
};

// Add recipe
const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file?.filename || null,
      createdBy: req.user.id,
    });

    return res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json({ message: "Error creating recipe" });
  }
};

// Edit recipe
const editRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const coverImage = req.file?.filename ? req.file.filename : recipe.coverImage;

    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      { ...req.body, coverImage },
      { new: true }
    );

    res.json(updatedRecipe);
  } catch (err) {
    return res.status(500).json({ message: "Error updating recipe" });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    await Recipes.deleteOne({ _id: req.params.id });
    res.json({ status: "ok" });
  } catch (err) {
    return res.status(400).json({ message: "Error deleting recipe" });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
