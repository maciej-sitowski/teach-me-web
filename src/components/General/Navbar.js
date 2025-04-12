import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-b-2xl">
      <h1 className="text-2xl font-bold">Teach Me</h1>
      <div className="space-x-4">
        <Link to="/" className="text-white hover:bg-white/10d">Home</Link>
        <Link to="/questions" className="text-white hover:bg-white/10d">Questions</Link>
      </div>
    </nav>
  );
};
  
export default Navbar;
