
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-navy">TravelGenius</h1>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#" className="text-navy hover:text-desert transition-colors">Home</a>
              <a href="#features" className="text-navy hover:text-desert transition-colors">Features</a>
              <a href="#how-it-works" className="text-navy hover:text-desert transition-colors">How it Works</a>
              <a href="#contact" className="text-navy hover:text-desert transition-colors">Contact</a>
              <button className="bg-navy text-white px-6 py-2 rounded-full hover:bg-desert transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-navy hover:text-desert transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-navy hover:text-desert transition-colors">Home</a>
              <a href="#features" className="block px-3 py-2 text-navy hover:text-desert transition-colors">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-navy hover:text-desert transition-colors">How it Works</a>
              <a href="#contact" className="block px-3 py-2 text-navy hover:text-desert transition-colors">Contact</a>
              <button className="w-full mt-2 bg-navy text-white px-6 py-2 rounded-full hover:bg-desert transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
