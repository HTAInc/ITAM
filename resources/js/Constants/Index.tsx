import { BsMouse2 } from "react-icons/bs"
import { FaRegChartBar } from "react-icons/fa"
import { GrLicense } from "react-icons/gr"
import { HiOutlineOfficeBuilding } from "react-icons/hi"
import { IoRibbonOutline } from "react-icons/io5"
import { MdOutlineMemory } from "react-icons/md"
import { PiCurrencyDollarLight, PiTreeStructureLight, PiUsersThree } from "react-icons/pi"
import { RiBarcodeFill, RiDashboard3Line } from "react-icons/ri"

export const MENU_ITEMS = [
    {
        label: 'Dashboard',
        url: 'auth.dashboard',
        active: 'auth.dashboard',
        icon: <RiDashboard3Line className='h-5 w-5 mr-2' />
    },
    {
        label: 'Assets',
        url: 'auth.assets.index',
        active: 'assets.*',
        icon: <RiBarcodeFill className='h-5 w-5 mr-2' />
    },
    {
        label: 'Licenses',
        url: 'auth.licenses.index',
        active: 'auth.licenses.*',
        icon: <GrLicense className='h-5 w-5 mr-2' />
    },
    {
        label: 'Accessories',
        url: 'auth.accessories.index',
        active: 'auth.accessories.*',
        icon: <BsMouse2 className='h-5 w-5 mr-2' />
    },
    {
        label: 'Components',
        url: 'auth.components.index',
        active: 'auth.components.*',
        icon: <MdOutlineMemory className='h-5 w-5 mr-2' />
    },
    {
        label: 'Downtime',
        url: 'auth.downtime.index',
        active: 'auth.downtime.*',
        icon: <FaRegChartBar className='h-5 w-5 mr-2' />
    },
    {
        label: 'users',
        url: 'auth.user.index',
        active: 'auth.user.*',
        icon: <PiUsersThree className='h-5 w-5 mr-2' />
    },
]

export const MENU_SETTINGS = [    
    {
        label: 'Section',
        url: 'auth.section.index',
        active: 'auth.section.*',
        icon: <PiTreeStructureLight className='h-5 w-5 mr-2' />
    },
    {
        label: 'Department',
        url: 'auth.department.index',
        active: 'auth.department.*',
        icon: <IoRibbonOutline className='h-5 w-5 mr-2' />
    },
    {
        label: 'Company',
        url: 'auth.company.index',
        active: 'auth.company.*',
        icon: <HiOutlineOfficeBuilding className='h-5 w-5 mr-2' />
    },
    {
        label: 'Depreciation',
        url: 'auth.depreciation.index',
        active: 'auth.depreciation.*',
        icon: <PiCurrencyDollarLight className='h-5 w-5 mr-2' />
    },
    {
        label: 'Depreciation',
        url: 'auth.depreciation.index',
        active: 'auth.depreciation.*',
        icon: <PiCurrencyDollarLight className='h-5 w-5 mr-2' />
    },

]