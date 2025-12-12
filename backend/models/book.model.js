const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    bookImage: {
      type: String,
      required: true,
    },
    bookAuthor: {
      type: String,
      required: true,
    },
    bookPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

// async function createBook() {
//   const book = await Book.create({
//     bookName: "The Alchemist",
//     bookImage: "https://m.media-amazon.com/images/I/617lxveUjYL.jpg",
//     bookAuthor: "Paulo Coelho",
//     bookPrice: 254,
//   });

//   console.log(book);
// }

// createBook();

module.exports = Book;
