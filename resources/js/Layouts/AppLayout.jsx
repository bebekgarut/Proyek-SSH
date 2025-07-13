import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import LoginModal from "@/Pages/Auth/Login";

export default function AppLayout({ children }) {
    const { props } = usePage();
    const { auth, showLoginModal: serverShowLoginModal } = props;
    // console.log("Props dari server:", props);

    const [clientShowLoginModal, setClientShowLoginModal] = useState(false);
    const [hasDismissedModal, setHasDismissedModal] = useState(false);

    useEffect(() => {
        console.log("📦 showLoginModal:", serverShowLoginModal);
        console.log("👤 auth.user:", auth.user);
        if (serverShowLoginModal && !auth.user && !hasDismissedModal) {
            setClientShowLoginModal(true);
        } else {
            setClientShowLoginModal(false);
        }
    }, [serverShowLoginModal, auth.user, hasDismissedModal]);

    useEffect(() => {
        const handleError = (event) => {
            if (event.detail.response && event.detail.response.status === 401) {
                alert("Anda tidak memiliki izin untuk mengakses ini.");
                event.preventDefault();
            }
        };

        router.on("error", handleError);

        return () => {
            router.off("error", handleError);
        };
    }, []);

    useEffect(() => {
        if (auth.user) {
            setHasDismissedModal(false);
            document.cookie =
                "modal_dismissed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }, [auth.user]);
    const handleModalClose = () => {
        setClientShowLoginModal(false);
        setHasDismissedModal(true);
        document.cookie = "modal_dismissed=true; path=/";
    };

    return (
        <>
            {children}
            {clientShowLoginModal && (
                <LoginModal
                    show={clientShowLoginModal}
                    onClose={handleModalClose}
                />
            )}
        </>
    );
}
