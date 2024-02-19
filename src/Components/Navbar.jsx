import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

function Navbar() {
  return (
    <div>
      <nav>
        <ul className="flex flex-row font-medium p-4 space-x-20 justify-center w-screen list-none">
          <CustomLink to="/" className="text-white hover:text-blue-700">
            Home
          </CustomLink>
          <CustomLink
            to="/characters"
            className="text-white hover:text-blue-700"
          >
            Characters
          </CustomLink>
          <CustomLink to="/items" className=" text-white hover:text-blue-700">
            Items
          </CustomLink>
          <CustomLink to="/places" className=" text-white hover:text-blue-700">
            Places
          </CustomLink>
          <CustomLink to="/misc" className=" text-white hover:text-blue-700">
            Misc
          </CustomLink>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
