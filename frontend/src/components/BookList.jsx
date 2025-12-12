import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { BookDataContext } from "../context/BookDataContext";

function BookList() {
  const [books, setBooks] = useState([]);
  const { setBookData } = useContext(BookDataContext);

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        const data = response.data;
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    }
    getBooks();
  }, []);

  async function handleDeleteBook(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/books/${id}`
      );
      const data = response.data;

      if (data.success) {
        alert(data.message);
        const updatedBooks = books.filter((book) => book._id !== id);
        setBooks(updatedBooks);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getBookDetails(id) {
    const updateBook = books.find((book) => book._id === id);
    setBookData((prev) => ({ ...prev, ...updateBook, isEditing: true }));
  }

  return (
    <div className="grid grid-cols-5 gap-x-2 gap-y-15 mt-10">
      {books.map((book) => (
        <div
          className="w-[190px] rounded-sm shadow-lg border border-gray-200 bg-white"
          key={book._id}
        >
          <div className="p-3">
            <img
              className="rounded-md h-[250px] w-full object-cover"
              src={book.bookImage}
              alt={book.bookName}
            />
          </div>
          <div className="px-3">
            <p className="font-medium text-[16px] leading-5">
              {book.bookName.toUpperCase()}
            </p>
            <p className="mt-2 text-[14px]">{book.bookAuthor}</p>
            <p className="mt-3 text-[14px]">₹{book.bookPrice}</p>
          </div>
          <div className="flex gap-3 items-center px-3 py-2 mt-6 ">
            <button onClick={() => handleDeleteBook(book._id)}>
              <MdDelete className="cursor-pointer" color="red" size={20} />
            </button>
            <button onClick={() => getBookDetails(book._id)}>
              <HiPencil className="text-green-500 cursor-pointer" size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
