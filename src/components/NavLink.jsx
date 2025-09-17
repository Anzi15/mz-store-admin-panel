import clsx from "clsx";

function NavLink({ children, href, mobile = false, disabled = false }) {
  const textAndCursorUtils = disabled
    ? "text-neutral-400 cursor-not-allowed"
    : mobile
    ? "text-neutral-900 cursor-pointer"
    : "text-neutral-600 hover:text-neutral-900 cursor-pointer";
  return (
    <a
      href={href}
      className={clsx(
        "w-fit focus:rounded focus:outline-none focus:ring-4 focus:ring-indigo-600/[.12]",
        mobile && "text-md px-3 py-2 font-normal",
        !mobile && "font-medium text-base px-0.5",
        textAndCursorUtils
      )}
    >
      {children}
    </a>
  );
}

export default NavLink;
