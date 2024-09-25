import { Link, usePage } from "@inertiajs/react";

export default function NavLink({ href, className = "", children, ...props }) {
    const { url } = usePage(); // Mengambil URL saat ini dari konteks halaman

    // Memeriksa apakah href cocok dengan URL saat ini
    const active = url === href;

    return (
        <Link
            href={href}
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-white-400 text-white focus:border-indigo-700 "
                    : "border-transparent text-gray-500 hover:text-cyan-500 hover:border-cyan-500 focus:text-cyan-500 focus:border-cyan-500 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
