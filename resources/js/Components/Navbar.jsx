import { useState } from "react";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Dropdown from "@/Components/Dropdown";

const Navbar = ({ user }) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="navbar p-2 bg-base-100 flex justify-between items-center">
            {/* Bagian logo atau judul */}
            <div className="w-fit">
                <a className="btn btn-ghost text-xl">SSH Kota Palembang</a>
            </div>

            {/* Bagian menu tengah untuk layar desktop */}
            <div className="hidden sm:flex justify-center items-center flex-1">
                <ul className="flex justify-center items-center space-x-10">
                    <li>
                        <NavLink href="/" className="text-lg font-semibold">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/" className="text-lg font-semibold">
                            SSH
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/" className="text-lg font-semibold">
                            HSPK
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/" className="text-lg font-extrabold">
                            ASB
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Bagian user login untuk layar desktop */}
            <div className="hidden sm:flex sm:items-center">
                {user ? (
                    <div className="ms-2 relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {user.name}
                                        <svg
                                            className="ms-2 -me-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                ) : (
                    <NavLink href={route("login")}>Login</NavLink>
                )}
            </div>

            {/* Tombol burger untuk mobile di ujung kanan */}
            <div className="flex items-center sm:hidden">
                <button
                    onClick={() =>
                        setShowingNavigationDropdown(
                            (previousState) => !previousState,
                        )
                    }
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            className={
                                !showingNavigationDropdown
                                    ? "inline-flex"
                                    : "hidden"
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            className={
                                showingNavigationDropdown
                                    ? "inline-flex"
                                    : "hidden"
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {/* Dropdown menu untuk mobile */}
            {showingNavigationDropdown && (
                <div className="sm:hidden block absolute top-0 left-0 w-full bg-white shadow-md z-10">
                    {/* Baris dengan logo dan tombol X */}
                    <div className="flex justify-between items-center p-2 bg-base-100">
                        {/* Logo atau judul */}
                        <a className="btn btn-ghost text-xl">
                            SSH Kota Palembang
                        </a>

                        {/* Tombol X untuk menutup menu */}
                        <button
                            onClick={() => setShowingNavigationDropdown(false)}
                            className="text-gray-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Bagian user untuk mobile */}
                    <div className="pt-1 pb-1 border-t border-gray-200">
                        {user ? (
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>
                        ) : (
                            <ResponsiveNavLink href={route("login")}>
                                Login
                            </ResponsiveNavLink>
                        )}
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href="/">Home</ResponsiveNavLink>
                        <ResponsiveNavLink href="/">SSH</ResponsiveNavLink>
                        <ResponsiveNavLink href="/">HSPK</ResponsiveNavLink>
                        <ResponsiveNavLink href="/">ASB</ResponsiveNavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
