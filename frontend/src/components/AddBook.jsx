import axios from "axios";
import { useContext } from "react";
import { BookDataContext } from "../context/BookDataContext";

function AddBook() {
  const { bookData, setBookData } = useContext(BookDataContext);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  }

  async function handleAddBook() {
    try {
      if (
        !bookData.bookName ||
        !bookData.bookImage ||
        !bookData.bookAuthor ||
        !bookData.bookPrice
      ) {
        alert("All fields are required");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:3000/api/books",
        bookData
      );

      if (data.success) {
        alert(data.message);
        setBookData({
          bookName: "",
          bookImage: "",
          bookAuthor: "",
          bookPrice: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateBook() {
    try {
      if (
        !bookData.bookName ||
        !bookData.bookImage ||
        !bookData.bookAuthor ||
        !bookData.bookPrice
      ) {
        alert("All fields are required");
        return;
      }

      if (!bookData._id) {
        alert("No book selected to update");
        return;
      }

      const { data } = await axios.put(
        `http://localhost:3000/api/books/${bookData._id}`,
        {
          bookName: bookData.bookName,
          bookImage: bookData.bookImage,
          bookAuthor: bookData.bookAuthor,
          bookPrice: bookData.bookPrice,
        }
      );

      if (data.success) {
        alert(data.message);
        setBookData({
          bookName: "",
          bookImage: "",
          bookAuthor: "",
          bookPrice: "",
          isEditing: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-18">
      <div>
        <form className="flex gap-5">
          <div className="flex flex-col gap-2 w-[24%]">
            <label>Book Name</label>
            <input
              className="border border-[#808080] rounded outline-none py-1 px-2 placeholder:text-[14px]"
              type="text"
              placeholder="Atomic Habits"
              name="bookName"
              value={bookData.bookName}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-[24%]">
            <label>Book Image</label>
            <input
              className="border border-[#808080] rounded outline-none py-1 px-2 placeholder:text-[14px]"
              type="text"
              placeholder="https://example.com/image.jpg"
              name="bookImage"
              value={bookData.bookImage}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-[24%]">
            <label>Book Author</label>
            <input
              className="border border-[#808080] rounded outline-none py-1 px-2 placeholder:text-[14px]"
              type="text"
              placeholder="James Clear"
              name="bookAuthor"
              value={bookData.bookAuthor}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-[24%]">
            <label>Book Price</label>
            <input
              className="border border-[#808080] rounded outline-none py-1 px-2 placeholder:text-[14px]"
              type="text"
              placeholder="479"
              name="bookPrice"
              value={bookData.bookPrice}
              onChange={handleOnChange}
            />
          </div>
        </form>
        <div className="flex justify-end mt-5">
          <button
            className="bg-[#D92195] text-white py-1.5 px-2 rounded cursor-pointer"
            onClick={bookData.isEditing ? handleUpdateBook : handleAddBook}
          >
            {bookData.isEditing ? "Update Book" : "Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
