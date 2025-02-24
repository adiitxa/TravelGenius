
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

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
              <a href="#plan-trip" className="text-navy hover:text-desert transition-colors">Plan Your Trip</a>
              <a href="#contact" className="text-navy hover:text-desert transition-colors">Contact</a>
              
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <div className="flex items-center gap-4">
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Sign Up</Button>
                  </SignUpButton>
                </div>
              )}
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
              <a href="#plan-trip" className="block px-3 py-2 text-navy hover:text-desert transition-colors">Plan Your Trip</a>
              <a href="#contact" className="block px-3 py-2 text-navy hover:text-desert transition-colors">Contact</a>
              
              {isSignedIn ? (
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-3 py-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full">Sign Up</Button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
