import { useState, useEffect } from "react";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Dropdown from "@/Components/Dropdown";
import { FaArrowRight } from "react-icons/fa";
import { usePage } from "@inertiajs/react";
import LoginModal from "@/Pages/Auth/Login";

const Navbar = ({ user }) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const { url } = usePage();
    const [search, setSearch] = useState("");

    const [showLoginModal, setShowLoginModal] = useState(false);

    const toggleDropdown = () => {
        if (!showingNavigationDropdown) {
            setShowingNavigationDropdown(true);
            setTimeout(() => setIsAnimating(true), 0);
        } else {
            setIsAnimating(false);
            setTimeout(() => {
                setShowingNavigationDropdown(false);
            }, 300);
        }
    };

    return (
        <div className="fixed top-0 navbar p-2 bg-base-100 flex justify-between items-center">
            <div className="w-fit">
                <a className="btn btn-ghost text-xl">e-SSH Kota Palembang</a>
            </div>

            {/* Menu desktop */}
            <div className="hidden sm:flex justify-center items-center flex-1">
                <ul className="flex justify-center items-center sm:space-x-5 md:space-x-10">
                    <li>
                        <NavLink
                            href="/"
                            active={url === "/" || url.includes("/user")}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            href="/ssh"
                            page={1}
                            perPage={100}
                            search={search}
                            active={url.includes("/ssh")}
                        >
                            SSH
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/ssh/tambah" active={url === "/hspk"}>
                            HSPK
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/asb" active={url === "/asb"}>
                            ASB
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* User login untuk desktop */}
            <div className="hidden sm:flex sm:items-center">
                {user ? (
                    <div className="ms-2 relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center md:px-3 sm:px-2 py-2 border border-transparent md:text-sm sm:text-xs leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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
                                <Dropdown.Link href={route("user.daftar")}>
                                    Daftar User
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
                    <div className="p-2 bg-slate-600 rounded-lg transition duration-300 hover:text-white group">
                        <NavLink
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                setShowLoginModal(true);
                            }}
                            className="flex mr-0 items-center text-gray-950 group-hover:text-white focus:text-gray-950 focus:border-none"
                        >
                            <span>Login</span>
                            <FaArrowRight
                                size={10}
                                className="ml-2 mr-0 animate-bounce group-hover:animate-none"
                            />
                        </NavLink>
                    </div>
                )}
            </div>

            {showLoginModal && (
                <LoginModal
                    show={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            )}

            {/* Tombol burger untuk mobile */}
            <div className="flex items-center sm:hidden">
                <button
                    onClick={toggleDropdown}
                    className="inline-flex items-center justify-center p-2 rounded-md "
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
                <div
                    className={`sm:hidden block absolute top-0 left-0 w-full bg-white shadow-md z-10 transform transition-all duration-300 ease-in-out origin-top ${
                        isAnimating
                            ? "scale-y-100 opacity-100"
                            : "scale-y-0 opacity-0"
                    } overflow-hidden`}
                >
                    <div className="flex justify-between items-center p-2 bg-base-100">
                        <a className="btn btn-ghost text-xl">
                            e-SSH Kota Palembang
                        </a>
                        <button
                            onClick={() => {
                                setIsAnimating(false);
                                setTimeout(() => {
                                    setShowingNavigationDropdown(false);
                                }, 300);
                            }}
                            className="text-gray-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
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
                            <ResponsiveNavLink
                                onClick={() => setShowLoginModal(true)}
                            >
                                Login
                            </ResponsiveNavLink>
                        )}
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href="/">Home</ResponsiveNavLink>
                        <ResponsiveNavLink href="/">SSH</ResponsiveNavLink>
                        <ResponsiveNavLink href="/">HSPK</ResponsiveNavLink>
                        <ResponsiveNavLink href="/">ASB</ResponsiveNavLink>
                        {user ? (
                            <ResponsiveNavLink href="/">
                                Logout
                            </ResponsiveNavLink>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
