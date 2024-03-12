import SidebarLink from '@/Components/SidebarLink';
import { Button } from '@/Components/ui/button';
import { MENU_ITEMS, MENU_SETTINGS } from '@/Constants/Index';
import { HiOutlineViewList } from 'react-icons/hi';
export default function Sidebar({}) {
    return (
        <div className="w-[260px] h-screen bg-gray-800 flex flex-col">
        <div className="w-full block p-2 h-12">
            <Button className='bg-cyan-600 float-right hover:bg-cyan-500 w-fit h-fit rounded'>
                <HiOutlineViewList className='text-white text-lg' />
            </Button>
        </div>
        <div className="">
            {MENU_ITEMS.map((item:any,i:number) => (
                <SidebarLink icon={item.icon} label={item.label} active={item.active} url={item.url} key={item.label+i}/>
            ))}
            <h1 className="text-gray-200 text-sm px-3 pt-5 pb-3">Settings</h1>
            {MENU_SETTINGS.map((item:any,i:number) => (
                <SidebarLink icon={item.icon} label={item.label} active={item.active} url={item.url} key={item.label+i}/>
            ))}
        </div>
    </div>
    )
}