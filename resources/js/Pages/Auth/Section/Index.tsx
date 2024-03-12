import ButtonActionTable from "@/Components/ButtonActionTable";
import FilteredTable from "@/Components/FilteredTable";
import Header from "@/Components/Header";
import { Toast } from "@/Components/Toast";
import Guest from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { SweetAlertIcon } from "sweetalert2";

interface Company {
    id: number;
    name: string;
}
interface Department {
    id: number;
    name: string;
    company: Company;
}

interface SectionProps {
    id: number;
    name: string;
    department: Department;
}

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}
 
export default function Index({sections,flashMessage}: PageProps<{sections: SectionProps[], flashMessage: FlashMessageProps}>) {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };

    const filteredData = sections.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            name: 'Company',
            selector: (row: SectionProps) => row.department.company.name,
        },
        {
            name: 'Department',
            selector: (row: SectionProps) => row.department.name,
        },
        {
            name: 'Section Name',
            selector: (row: SectionProps) => row.name,
        },
        {
            name: 'Actions',
            cell: (row: SectionProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.section.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.section.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
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
            <Header label="Sections" url="auth.section.create">
                <div className="inline-flex items-center">
                    <IoAdd/>
                    Create
                </div>
            </Header>
            <div className="flex gap-5">
                <div className="rounded-md border bg-white p-3 w-full">
                    <FilteredTable urlRefresh="auth.depreciation.index" onSearchChange={handleSearchChange} />            
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