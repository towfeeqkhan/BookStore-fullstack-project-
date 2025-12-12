const express = require("express");
const Book = require("../models/book.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.log("Error fetching books", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }

    res.json({
      message: "Book deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error deleting book", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { bookName, bookImage, bookAuthor, bookPrice } = req.body;

    if (!bookName || !bookImage || !bookAuthor || !bookPrice) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const newBook = await Book.create({
      bookName,
      bookImage,
      bookAuthor,
      bookPrice,
    });

    res.status(201).json({
      message: "Book added successfully",
      success: true,
      Id: newBook._id,
    });
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { bookName, bookImage, bookAuthor, bookPrice } = req.body;

    if (!bookName || !bookImage || !bookAuthor || !bookPrice) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const updateBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        bookName,
        bookImage,
        bookAuthor,
        bookPrice,
      },
      {
        runValidators: true,
      }
    );

    if (!updateBook) {
      return res
        .status(400)
        .json({ message: "Book not found", success: false });
    }

    res.json({ message: "Book updated successfully", success: true });
  } catch (error) {
    console.log("Error updating book", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

module.exports = router;
