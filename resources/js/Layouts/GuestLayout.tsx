
import { PropsWithChildren } from 'react';
import Sidebar from './Sidebar';


export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="h-screen flex pt-6 sm:pt-0 bg-gray-100">
            <Sidebar/>
            <div className="w-full">
                <div className="w-full h-12 bg-gradient-to-r from-cyan-400 to-cyan-600">
                </div>
                <div className="w-full p-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
