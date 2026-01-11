import { ShoppingCart, Search, Menu } from "lucide-react";

function Header() {
  return (
    <header className="bg-blue-300 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* ---------- MOBILE LEFT (Hamburger) ---------- */}
        <button className="lg:hidden p-2">
          <Menu size={24} />
        </button>

        {/* ---------- LOGO (Centered on Mobile) ---------- */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          <img
            src="/image.png"
            alt="Logo"
            className="w-24 h-auto "
          />
        </div>

        {/* ---------- DESKTOP NAV ---------- */}
        <nav className="hidden lg:flex items-center gap-5 text-lg font-medium text-gray-700 mx-auto">
          <a className="cursor-pointer hover:text-blue-900">Courses</a>
          <a className="cursor-pointer hover:text-blue-900">Licences</a>
          <a className="cursor-pointer hover:text-blue-900">Locations</a>

          {/* Search input */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search for courses or training providers"
              className="pl-9 pr-3 py-2 w-64 rounded-full border text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <a className="cursor-pointer hover:text-blue-900">Blog</a>
          <a className="cursor-pointer hover:text-blue-900">Test Prep</a>
        </nav>

        {/* ---------- RIGHT ACTIONS ---------- */}
        <div className="flex items-center gap-3">

          {/* Mobile icons */}
          <button className="lg:hidden p-2">
            <Search size={22} />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-md">
            <ShoppingCart size={22} />
          </button>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="bg-red-400 text-white px-4 py-2 rounded-md text-lg font-semibold">
              Sign Up
            </button>

            <button className="bg-blue-900 text-white px-4 py-2 rounded-md text-lg font-semibold">
              Log in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
