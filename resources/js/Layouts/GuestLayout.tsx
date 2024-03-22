
import { PropsWithChildren } from 'react';
import Sidebar from './Sidebar';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="h-screen flex pt-6 sm:pt-0 bg-gray-100">
            <Sidebar/>
            {/* <SidebarNew/> */}
            <div className="w-full overflow-hidden overflow-y-auto">
                <div className="w-full h-12 bg-gradient-to-r from-cyan-400 to-cyan-600 sticky top-0 z-50">
                </div>
                <div className="w-full p-3 relative">
                    {children}
                </div>
            </div>
        </div>
    );
}
