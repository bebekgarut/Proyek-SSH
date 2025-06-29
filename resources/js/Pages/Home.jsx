import React from "react";
import { Link, Head } from "@inertiajs/react";
import { data } from "autoprefixer";
import Navbar from "@/Components/Navbar";
import Background from "@/Components/Background";

export default function Home(props) {
    return (
        <>
            <Head title={props.title} />
            <Background>
                <Navbar user={props.auth.user} />
                <div className="w-full min-h-screen bg-gray-100 bg-opacity-50">
                    <div className="flex flex-col justify-center  items-center h-screen text-slate-800 font-normal text-lg">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl w-2/3 px-3 rounded-badge text-center font-bold font-serif">
                            Selamat Datang di e-SSH
                        </h1>
                        <div className="text-xl sm:text-2xl md:text-3xl pt-1 font-semibold">
                            Kota Palembang
                        </div>
                        <div className="w-1/2 text-sm sm:text-base md:text-lg pt-1 text-center text-gray-950">
                            e-SSH atau elektronik standar satuan harga merupakan
                            sistem berbasis web digunakan untuk menampung data
                            Standar Harga sebagai acuan awal perencanaan dan
                            penganggaran.
                        </div>
                    </div>
                </div>
            </Background>
        </>
    );
}
