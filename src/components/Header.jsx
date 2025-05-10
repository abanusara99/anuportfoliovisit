
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming Button is JS compatible
import { Menu } from 'lucide-react'; // Import Menu icon for mobile
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from '@/components/ui/sheet'; // Import Sheet components
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'; // Assuming VisuallyHidden is available here

const Header = () => {
  const scrollToSection = (id) => (event) => {
    event.preventDefault(); // Prevent default link behavior
    const section = document.getElementById(id);
    if (section) {
      // Close mobile menu if open (assuming SheetClose triggers on click inside)
      const closeButton = document.querySelector('[data-radix-dialog-close]');
      closeButton?.click(); // Programmatically click the close button if found

      // Delay scrolling slightly to allow menu to close
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 150); // Adjust delay as needed
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm py-4 px-6 shadow-md">
      <nav className="container mx-auto flex justify-between items-center"> {/* Changed back to justify-between for mobile trigger */}
        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex justify-center space-x-6 flex-grow"> {/* Centered desktop menu */}
           <Button
            variant="link"
            className="text-foreground hover:text-gray-300 hover:no-underline transition-colors px-0"
            onClick={scrollToSection('about')} // Use root page for 'About'
            aria-label="Scroll to About section"
            asChild // Allow Button to wrap the anchor tag for styling
          >
            <a href="#about">About</a>
          </Button>
          <Button
            variant="link"
            className="text-foreground hover:text-gray-300 hover:no-underline transition-colors px-0"
            onClick={scrollToSection('skills')}
            aria-label="Scroll to Skills section"
            asChild
          >
            <a href="#skills">Skills</a>
          </Button>
          <Button
            variant="link"
            className="text-foreground hover:text-gray-300 hover:no-underline transition-colors px-0"
            onClick={scrollToSection('achievements')}
            aria-label="Scroll to Achievements section"
            asChild
          >
            <a href="#achievements">Achievements</a>
          </Button>
          <Button
            variant="link"
            className="text-foreground hover:text-gray-300 hover:no-underline transition-colors px-0"
            onClick={scrollToSection('portfolio')}
            aria-label="Scroll to Portfolio section"
            asChild
          >
            <a href="#portfolio">Portfolio</a>
          </Button>
          <Button
            variant="link"
            className="text-foreground hover:text-gray-300 hover:no-underline transition-colors px-0"
            onClick={scrollToSection('contact')}
            aria-label="Scroll to Contact section"
            asChild
          >
            <a href="#contact">Contact</a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground focus:outline-none" aria-label="Open mobile menu">
                 <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-sidebar text-sidebar-foreground p-6 w-64"> {/* Adjusted side and styling */}
               {/* Accessibility: Add a visually hidden title and description for the sheet */}
               <VisuallyHidden>
                 <SheetTitle>Mobile Menu</SheetTitle>
               </VisuallyHidden>
              <div className="flex flex-col space-y-4 mt-4">
                  <SheetClose asChild>
                      <Button
                        variant="link"
                        className="text-sidebar-foreground hover:text-gray-300 hover:no-underline transition-colors justify-start px-0"
                        onClick={scrollToSection('about')}
                        aria-label="Scroll to About section"
                        asChild
                      >
                         <a href="#about">About</a>
                      </Button>
                   </SheetClose>
                   <SheetClose asChild>
                      <Button
                        variant="link"
                        className="text-sidebar-foreground hover:text-gray-300 hover:no-underline transition-colors justify-start px-0"
                        onClick={scrollToSection('skills')}
                        aria-label="Scroll to Skills section"
                        asChild
                      >
                         <a href="#skills">Skills</a>
                      </Button>
                   </SheetClose>
                   <SheetClose asChild>
                      <Button
                        variant="link"
                        className="text-sidebar-foreground hover:text-gray-300 hover:no-underline transition-colors justify-start px-0"
                        onClick={scrollToSection('achievements')}
                        aria-label="Scroll to Achievements section"
                        asChild
                      >
                         <a href="#achievements">Achievements</a>
                      </Button>
                   </SheetClose>
                   <SheetClose asChild>
                       <Button
                        variant="link"
                        className="text-sidebar-foreground hover:text-gray-300 hover:no-underline transition-colors justify-start px-0"
                        onClick={scrollToSection('portfolio')}
                        aria-label="Scroll to Portfolio section"
                        asChild
                      >
                         <a href="#portfolio">Portfolio</a>
                       </Button>
                   </SheetClose>
                   <SheetClose asChild>
                       <Button
                        variant="link"
                        className="text-sidebar-foreground hover:text-gray-300 hover:no-underline transition-colors justify-start px-0"
                        onClick={scrollToSection('contact')}
                        aria-label="Scroll to Contact section"
                        asChild
                      >
                         <a href="#contact">Contact</a>
                       </Button>
                   </SheetClose>
              </div>
               <VisuallyHidden>
                 <SheetDescription>Navigation menu for the website</SheetDescription>
               </VisuallyHidden>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
