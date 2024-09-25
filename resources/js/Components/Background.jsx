import React from "react";

const Background = ({ children }) => {
    return (
        <div
            className="bg-cover bg-fixed bg-center min-h-screen w-full"
            style={{
                backgroundImage: `url('/img/bpkad.jpg')`,
            }}
        >
            <div className="min-h-screen bg-gray-100 bg-opacity-50">
                {children}
            </div>
        </div>
    );
};

export default Background;
