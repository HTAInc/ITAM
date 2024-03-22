import ButtonActionTable from "@/Components/ButtonActionTable";
import FilteredTable from "@/Components/FilteredTable";
import Header from "@/Components/Header";
import Loading from "@/Components/Loading";
import { Toast } from "@/Components/Toast";
import Guest from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";
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
    code: string;
    company: CompanyProps;
}

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}

interface IndexProps {
    companies: CompanyProps;
    departments: DepartmentProps[];
    flashMessage: FlashMessageProps;
}
 
export default function Index({departments,flashMessage}: IndexProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(true);

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };

    const filteredData = departments.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.company.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            name: 'Company Name',
            selector: (row: DepartmentProps) => row.company.name,
        },
        {
            name: 'Department Name',
            selector: (row: DepartmentProps) => row.name,
        },
        {
            name: 'Code',
            selector: (row: DepartmentProps) => row.code,
        },
        {
            name: 'Actions',
            cell: (row: DepartmentProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.department.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.department.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
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
            <Header label="Departments" url="auth.department.create">
                <div className="inline-flex items-center">
                    <IoAdd/>
                    Create
                </div>
            </Header>
            <div className="flex gap-5">
                <div className="rounded-md border bg-white p-3 w-full">
                    <FilteredTable urlRefresh="auth.department.index" onSearchChange={handleSearchChange} />            
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