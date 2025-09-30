"use client";
import { Media } from "@/payload-types";
import { NavChildItem } from "@/types";
import { getLink, getTitle } from "@/utils/getLinkAndTitle";
import { useWindowScroll } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MegaDropdown } from "./HeaderDropdown";
const navLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

interface HeaderClientProps {
  logo?: Media;
  menu:NavChildItem[]
}

const HeaderClient = (props:HeaderClientProps) => {
  const {logo,menu} = props

  const [isOpen, setIsOpen] = useState(false);
  const [{ y }] = useWindowScroll(); 
  const [megaDropdownOpen, setMegaDropdownOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: {
      x: "100%",
      transition: {
        type: "tween",
        ease: "easeInOut",
      },
    },
    visible: {
      x: "0%",
      transition: {
        type: "tween",
        ease: "easeInOut",
      },
    },
  };
  const handleMenuItemHover = (itemId: string) => {
    setActiveMenuItem(itemId)
    setMegaDropdownOpen(true)
  }

  const handleMenuLeave = () => {
    setTimeout(() => {
      setActiveMenuItem(null)
      setMegaDropdownOpen(false)
    }, 100)
  }

  const handleDropdownEnter = () => {
    setMegaDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    setActiveMenuItem(null)
    setMegaDropdownOpen(false)
  }
  const isScrolled = (y ?? 0) > 50;
  const activeItem = activeMenuItem ? menu.find(item => item.id === activeMenuItem) : null;
  const showMega = !!(activeItem && activeItem.isShowMega);

  return (
    <>
       <div
        className={`flex gap-12 items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? "h-10" : "h-17"
        }`}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          {/* <Link href="/" aria-label="Back to homepage" className="block">
            {logo ? (
              <div className="relative w-32 h-8 sm:w-28 sm:h-9 md:w-32 md:h-10 lg:w-36 lg:h-12">
                <Image
                  src={getMediaURL(logo, "large") || "/placeholder.svg"}
                  alt={logo?.alt || "logo"}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-black">Mood co.</div>
            )}
          </Link> */}
        </div>

        <nav className="flex-1 hidden md:flex md:items-center md:space-x-8">
            {menu.map((link) => (
            <Link
              key={link.id}
              href={getLink(link)}
              className={`text-sm lg:text-base font-medium transition-colors duration-200 `} 
              onMouseEnter={() => handleMenuItemHover(link.id)}
              >
              {getTitle(link)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex justify-end items-center space-x-4 w-1/3 lg:w-1/4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
            Login
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="z-50">
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <MegaDropdown
           isOpen={megaDropdownOpen && showMega}
           onClose={handleDropdownLeave}
           onMouseEnter={handleDropdownEnter}
           onMouseLeave={handleDropdownLeave}
      />
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-white pt-16"
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {menu.map((link) => (
            <Link
              key={link.id}
              href={getLink(link)}
                  className="text-2xl text-gray-800 hover:text-black"
                  onClick={toggleMenu}
                >
                  {getTitle(link)}
                </Link>
              ))}
              <div className="flex flex-col space-y-4 w-full px-8 pt-8">
                <button className="w-full px-4 py-3 text-md font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
                  Login
                </button>
                <button className="w-full px-4 py-3 text-md font-medium text-white bg-black rounded-md hover:bg-gray-800">
                  Sign Up
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderClient;
