import { BsFillBuildingsFill, BsMouse2 } from "react-icons/bs"
import { FaRegChartBar } from "react-icons/fa"
import { GrLicense } from "react-icons/gr"
import { HiOutlineOfficeBuilding } from "react-icons/hi"
import { IoRibbonOutline } from "react-icons/io5"
import { MdOutlineMemory } from "react-icons/md"
import { PiCurrencyDollarLight, PiTreeStructureLight, PiUsersThree } from "react-icons/pi"
import { RiBarcodeFill, RiDashboard3Line } from "react-icons/ri"
import { BiCategoryAlt } from "react-icons/bi";
import { FaDiceD20 } from "react-icons/fa6";
import { TbTableOptions } from "react-icons/tb";

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
        label: 'Downtimes',
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
        label: 'Asset Models',
        url: 'auth.model-device.index',
        active: 'auth.model-device.*',
        icon: <FaDiceD20 className='h-5 w-5 mr-2' />
    }, 
    {
        label: 'Custom Fields',
        url: 'auth.field.index',
        active: 'auth.field.*',
        icon: <TbTableOptions className='h-5 w-5 mr-2' />
    }, 
    {
        label: 'Categories',
        url: 'auth.category.index',
        active: 'auth.category.*',
        icon: <BiCategoryAlt className='h-5 w-5 mr-2' />
    }, 
    {
        label: 'Manufacturers',
        url: 'auth.manufacture.index',
        active: 'auth.manufacture.*',
        icon: <BsFillBuildingsFill className='h-5 w-5 mr-2' />
    }, 
    {
        label: 'Sections',
        url: 'auth.section.index',
        active: 'auth.section.*',
        icon: <PiTreeStructureLight className='h-5 w-5 mr-2' />
    },
    {
        label: 'Departments',
        url: 'auth.department.index',
        active: 'auth.department.*',
        icon: <IoRibbonOutline className='h-5 w-5 mr-2' />
    },
    {
        label: 'Companies',
        url: 'auth.company.index',
        active: 'auth.company.*',
        icon: <HiOutlineOfficeBuilding className='h-5 w-5 mr-2' />
    },
    {
        label: 'Depreciations',
        url: 'auth.depreciation.index',
        active: 'auth.depreciation.*',
        icon: <PiCurrencyDollarLight className='h-5 w-5 mr-2' />
    },
    

]

export const DOWNTIME_CATEGORIES_DATA = [
    {value: 'DATABASE', label: 'DATABASE'},
    {value: 'FILE SHARING', label: 'FILE SHARING'},
    {value: 'INTERNET', label: 'INTERNET'},
    {value: 'SERVER', label: 'SERVER'},
]

export const CATEGORY_TYPE_DATA = [
    {
        value: 'ASSET',
        label: 'ASSET'
    },
    {
        value: 'ACCESSORIES',
        label: 'ACCESSORIES'
    },
    {
        value: 'COMPONENT',
        label: 'COMPONENT'
    },
    {
        value: 'CONSUMABLE',
        label: 'CONSUMABLE'
    },
    {
        value: 'LICENSE',
        label: 'LICENSE'
    },
]