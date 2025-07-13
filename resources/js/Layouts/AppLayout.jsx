import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import LoginModal from "@/Pages/Auth/Login";

export default function AppLayout({ children }) {
    const { auth, loginState } = usePage().props;
    const [clientShowModal, setClientShowModal] = useState(false);

    useEffect(() => {
        if (loginState?.showLoginModal && !auth?.user) {
            setClientShowModal(true);
        }
    }, [loginState?.showLoginModal, auth?.user]);

    const handleModalClose = () => {
        setClientShowModal(false);

        // Kirim request ke backend untuk set session false
        router.post(
            route("modal.reset"),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (
        <>
            {children}
            {clientShowModal && (
                <LoginModal show={true} onClose={handleModalClose} />
            )}
        </>
    );
}
