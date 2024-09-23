import React from "react";
import { Link, Head } from "@inertiajs/react";
import { data } from "autoprefixer";
import Navbar from "@/Components/Navbar";
import Table from "@/Components/Home/Table";
import Pagination from "@/Components/Home/Pagination";

export default function Home(props) {
    return (
        <>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="w-full min-h-screen p-5 bg-gray-100">
                <div className="overflow-x-auto shadow-lg rounded-lg"></div>
                {/* <Table ssh={props.ssh.data} />
                <div className="flex justify-center items-center">
                    <Pagination meta={props.ssh.meta} />
                </div> */}
            </div>
        </>
    );
}
