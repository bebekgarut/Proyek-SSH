import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    page = 1,
    perPage = 10,
    search = "",
    ...props
}) {
    // Buat URL dengan parameter yang sesuai
    const url = `${props.href}?page=${page}&perPage=${perPage}&search=${search}`;

    return (
        <Link
            href={url}
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-cyan-500 text-white focus:border-indigo-700 "
                    : "border-transparent text-gray-500 hover:text-cyan-500 hover:border-cyan-500 focus:text-gray-700 focus:border-gray-300 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
