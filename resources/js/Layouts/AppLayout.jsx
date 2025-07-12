// resources/js/Layouts/AppLayout.jsx

import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import LoginModal from "@/Pages/Auth/Login";

export default function AppLayout({ children }) {
    const { props } = usePage();
    const { auth, showLoginModal: serverShowLoginModal } = props;
    console.log("Props dari server:", props);

    const [clientShowLoginModal, setClientShowLoginModal] = useState(false);

    // Efek untuk memantau prop 'showLoginModal' dari server
    useEffect(() => {
        // Jika server memberi tahu untuk menampilkan modal DAN pengguna belum login
        if (serverShowLoginModal && !auth.user) {
            setClientShowLoginModal(true);
        } else {
            setClientShowLoginModal(false); // Sembunyikan modal jika user sudah login atau tidak diminta
        }
    }, [serverShowLoginModal, auth.user]); // Jalankan ulang efek jika prop ini berubah

    // Opsional: Handle event error Inertia untuk pesan lainnya (403, dll.)
    useEffect(() => {
        const handleError = (event) => {
            if (event.detail.response && event.detail.response.status === 401) {
                alert("Anda tidak memiliki izin untuk mengakses ini."); // Atau tampilkan SweetAlert2
                event.preventDefault(); // Mencegah Inertia menampilkan halaman error default
            }
        };

        router.on("error", handleError);

        return () => {
            router.off("error", handleError);
        };
    }, []);
    const [hasRedirected, setHasRedirected] = useState(false);
    useEffect(() => {
        if (auth.user && props.redirectAfterLogin && !hasRedirected) {
            setHasRedirected(true); // tandai bahwa kita sudah redirect
            router.visit(props.redirectAfterLogin);
        }
    }, [auth.user, props.redirectAfterLogin, hasRedirected]);
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Tampilkan modal berdasarkan state lokal */}
            {clientShowLoginModal && (
                <LoginModal
                    show={clientShowLoginModal}
                    onClose={() => setClientShowLoginModal(false)}
                />
            )}
        </div>
    );
}
