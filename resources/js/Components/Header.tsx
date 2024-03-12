import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

interface HeaderProps {
    label: string;
    url: string;
}

export default function Header({ label, url, children }: PropsWithChildren<HeaderProps>) {
    return (
        <div className="flex justify-between items-center mb-3">
            <h1 className="text-gray-800 text-2xl">{label}</h1>
            <Link href={route(url)} className="bg-cyan-600 text-white px-3 py-1 hover:bg-cyan-500 rounded flex items-center gap-1">
                {children}
            </Link>
        </div>
    );
}
