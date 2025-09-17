import clsx from "clsx";

function HamburgerButton({ onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "h-6 aspect-square lg:hidden",
        disabled && "text-neutral-400 cursor-not-allowed",
        !disabled && "text-neutral-600 cursor-pointer focus:rounded focus:outline-none focus:ring-4 focus:ring-indigo-600/[.12]"
      )}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
      </svg>
    </button>
  );
}

export default HamburgerButton;
