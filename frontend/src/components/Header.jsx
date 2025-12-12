function Header() {
  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <h1 className="text-3xl font-bold text-[#D92195]">BookStore</h1>
      </div>
      <div>
        <ul className="flex gap-20 text-[16px]">
          <li>Home</li>
          <li>Books</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
