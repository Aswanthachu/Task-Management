const Header = ({ setIsModalOpen }) => {
  return (
    <header className="flex justify-between items-center p-3 md:p-6 bg-blue-500 text-white w-screen">
      <h1 className="text-lg sm:text-xl md:text-3xl font-bold">
        Task Management App
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-blue-500 font-semibold py-2 px-2 md:px-4 rounded shadow hover:bg-gray-100 text-sm md:text-base"
      >
        Add Task
      </button>
    </header>
  );
};

export default Header;
