import ButtonActionTable from "@/Components/ButtonActionTable";
import FilteredTable from "@/Components/FilteredTable";
import Header from "@/Components/Header";
import { Toast } from "@/Components/Toast";
import Guest from "@/Layouts/GuestLayout";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
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

interface UserProps {
    id: number;
    name: string;
    code: string;
    section: SectionProps;
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

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };

    const filteredData = users.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.section.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            name: 'Company Name',
            selector: (row: UserProps) => row.name,
        },
        {
            name: 'Company Name',
            selector: (row: UserProps) => row.section.department.company.name,
        },
        {
            name: 'Section',
            selector: (row: UserProps) => row.section.name,
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
                    <FilteredTable urlRefresh="auth.department.index" onSearchChange={handleSearchChange} />            
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        striped
                        dense
                        highlightOnHover
                        pagination
                    />
                </div>
            </div>
        </Guest>
    )
}