import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import "sweetalert2/dist/sweetalert2.min.css";

import AppLayout from "./Layouts/AppLayout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        let page = pages[`./Pages/${name}.jsx`];

        return page().then(({ default: Page }) => {
            if (Page.layout === undefined) {
                Page.layout = (page) => <AppLayout>{page}</AppLayout>;
            }
            return Page;
        });
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
