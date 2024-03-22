import ButtonActionTable from "@/Components/ButtonActionTable";
import FilteredTable from "@/Components/FilteredTable";
import Header from "@/Components/Header";
import Loading from "@/Components/Loading";
import { Toast } from "@/Components/Toast";
import Guest from "@/Layouts/GuestLayout";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsMouse2 } from "react-icons/bs";
import { GrLicense } from "react-icons/gr";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { RiBarcodeFill } from "react-icons/ri";
import { SweetAlertIcon } from "sweetalert2";

interface CompanyProps {
    id: number;
    name: string;
}

interface DepartmentProps {
    id: number;
    name: string;
    company: CompanyProps;
}

interface SectionProps {
    id: number;
    name: string;
    department: DepartmentProps;
}

interface RoleProps {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: {
      model_type: string;
      model_id: number;
      role_id: number;
    };
  }

interface UserProps {
    id: number;
    name: string;
    email: string;
    section: SectionProps;
    roles: RoleProps[];
}

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}

interface IndexProps {
    company: CompanyProps;
    department: DepartmentProps;
    section: SectionProps;
    users: UserProps[];
    flashMessage: FlashMessageProps;
}
 
export default function Index({users,flashMessage}: IndexProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(true);

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };

    const filteredData = users.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.email.toLowerCase().includes(searchText.toLowerCase()) ||
        row.section.department.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.section.department.company.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.roles[0].name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.section.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            name: 'Name',
            selector: (row: UserProps) => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row: UserProps) => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: (row: UserProps) => row.roles[0].name,
            sortable: true,
        },
        {
            name: 'Company',
            selector: (row: UserProps) => row.section.department.company.name,
            sortable: true,
        },
        {
            name: 'Department',
            selector: (row: UserProps) => row.section.department.name,
            sortable: true,
        },
        {
            name: 'Section',
            selector: (row: UserProps) => row.section.name,
            sortable: true,
        },
        {
            name: (
                <RiBarcodeFill className="h-4 w-4"/>
            ),
            center:true,
            width:'60px',
            selector: (row: UserProps) => 150,
        },
        {
            name: (
                <GrLicense className="h-4 w-4"/>
            ),
            center:true,
            width:'60px',
            selector: (row: UserProps) => 150,
        },
        {
            name: (
                <BsMouse2 className="h-4 w-4"/>
            ),
            center:true,
            width:'60px',
            selector: (row: UserProps) => 150,
        },
        {
            name: 'Actions',
            cell: (row: UserProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.user.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.user.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
                        <HiOutlinePencilSquare/>
                    </ButtonActionTable>
                </div>
            ),
        },
    ];

    useEffect(() => {
        if(flashMessage.message){
            Toast({
                icon: flashMessage.type,
                title: flashMessage.message,
            }).fire();
        }
    }, [flashMessage]);  
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Guest>
            
            <Header label="Users" url="auth.user.create">
                <div className="inline-flex items-center">
                    <IoAdd/>
                    Create
                </div>
            </Header>
            <div className="flex gap-5">
                <div className="rounded-md border bg-white p-3 w-full">
                    <FilteredTable urlRefresh="auth.user.index" onSearchChange={handleSearchChange} />            
                    {loading ? (
                        <Loading/>
                    ):(
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            striped
                            dense
                            highlightOnHover
                            pagination
                        />
                    )}
                </div>
            </div>
        </Guest>
    )
}