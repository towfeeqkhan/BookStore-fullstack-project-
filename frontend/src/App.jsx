import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import Header from "./components/Header";

function App() {
  return (
    <div className="max-w-5xl mx-auto">
      <Header />
      <AddBook />
      <BookList />
    </div>
  );
}

export default App;
