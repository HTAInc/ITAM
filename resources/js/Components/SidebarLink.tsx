import { Link } from "@inertiajs/react";

interface SidebarItemProps {
    icon: React.ReactNode,
    label: string,
    url: string,
    active: string,
}

export default function SidebarLink({icon, label, url,active}: SidebarItemProps) {
    return (
        <Link href={route(url)} className={`w-full p-3 text-sm flex items-center transition-all ease-in-out border-l-4 ${route().current(active) ? 'text-white bg-gray-900 border-cyan-600': 'text-gray-400 hover:text-white hover:bg-gray-900 hover:border-l-4 border-gray-800 hover:border-cyan-600'}`}>
            {icon}
            <span>{label}</span>
        </Link>
    )
}