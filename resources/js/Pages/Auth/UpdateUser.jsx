import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Background from "@/Components/Background";
import Navbar from "@/Components/Navbar";
import { useEffect } from "react";

export default function Edit(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        password: "",
        password_confirmation: "",
    });

    const user = props.user;
    useEffect(() => {
        if (user) {
            setData("name", user.name);
        }
    }, [user]);

    const submit = (e) => {
        e.preventDefault();

        post(route("user.update", user.id), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title={props.title} />
            <Background>
                <Navbar user={props.auth.user}></Navbar>
                <div className="flex flex-col justify-center items-center min-h-screen ">
                    <div className="flex justify-center mt-10 lg:mt-16">
                        <p className="md:text-3xl text-2xl text-center font-serif font-bold text-slate-800">
                            Edit User
                        </p>
                    </div>
                    <div className="w-full sm:max-w-md mt-2 px-6 py-4 bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                    className="text-cyan-300"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border-input bg-input"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    placeholder="Masukan nama"
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-2">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-cyan-300"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full border-input bg-input"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                    placeholder="Masukan Password"
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-2">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="text-cyan-300"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full border-input bg-input"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    required
                                    placeholder="Konfirmasi Password"
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-2">
                                {/* <Link
                                    href={route("login")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Already registered?
                                </Link> */}

                                <button
                                    className="px-2 py-2 mt-2 rounded-md font-semibold bg-indigo-500 hover:bg-indigo-500/45"
                                    disabled={processing}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Background>
        </>
    );
}
