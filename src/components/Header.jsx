"use client"; // Ensures this component runs on the client side in a Next.js app

import { useEffect, useState } from "react";
import CartButton from "./CartButton.jsx";
import HamburgerButton from "./HamburgerButton";
import Logo from "./Logo";
import MobileNavbar from "./MobileNavbar";
import Navbar from "../components/NavBar.jsx";
import { db } from "../modules/firebase-modules/firestore.js";
import { doc, getDoc } from "firebase/firestore";

const links = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Shop all",
    href: "/products",
  },
  {
    id: 3,
    name: "About Us",
    href: "/about",
  },
  {
    id: 4,
    name: "Contact Us",
    href: "/contact",
  },
];

function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [headerText, setHeaderText] = useState("Gm foods achars");

  useEffect(() => {
    const fetchHeaderMsg = async () => {
      try {
        const docRef = doc(db, "storeManagement", "headerNotificationMsg");
        const docSnap = await getDoc(docRef); // Renamed doc to docSnap
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setHeaderText(docSnap.data().value); // Set the value you need
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching header message:", error);
      }
    };

    fetchHeaderMsg();
  }, []);

  return (
    <>
      <div className="w-full bg-black py-2 text-white md:text-lg sm:text-sm text-[0.85rem]">
        {headerText}
      </div>
      <header className="max-w-[1440px] mx-auto pt-7 pb-3 flex items-center gap-[103px] h-[84px] min-[1440px]:h-fit px-4 md:px-8 min-[1440px]:px-28">
        <Logo />
        <Navbar links={links} />
        <div className="flex justify-center items-center gap-4 ml-auto">
          <CartButton />
          <HamburgerButton onClick={() => setIsMobileOpen(!isMobileOpen)} />
        </div>
        <MobileNavbar
          links={links}
          isMobileOpen={isMobileOpen}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        />
      </header>
    </>
  );
}

export default Header;
