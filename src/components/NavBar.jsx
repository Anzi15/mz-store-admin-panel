import { Link } from "react-router-dom";
import NavLink from "./NavLink.jsx";

function Navbar({ links }) {
  console.log(links)
  return (
    <div className="hidden lg:flex items-center gap-8 grow justify-center">
      {links.map((link) => {
        return (
          <Link key={link.id} to={link.href}>
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}

export default Navbar;
