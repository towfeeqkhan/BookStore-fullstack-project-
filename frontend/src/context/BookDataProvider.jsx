import { useState } from "react";
import { BookDataContext } from "./BookDataContext";

export function BookDataProvider({ children }) {
  const [bookData, setBookData] = useState({
    bookName: "",
    bookImage: "",
    bookAuthor: "",
    bookPrice: "",
  });

  return (
    <BookDataContext.Provider value={{ bookData, setBookData }}>
      {children}
    </BookDataContext.Provider>
  );
}
