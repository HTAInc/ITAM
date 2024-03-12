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

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}

interface IndexProps {
    companies: CompanyProps[];
    flashMessage: FlashMessageProps;
}
 
export default function Index({companies,flashMessage}: IndexProps) {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };

    const filteredData = companies.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            name: 'Name',
            selector: (row: CompanyProps) => row.name,
        },
        {
            name: 'Actions',
            cell: (row: CompanyProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.company.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.company.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
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
            <Header label="Companies" url="auth.company.create">
                <div className="inline-flex items-center">
                    <IoAdd/>
                    Create
                </div>
            </Header>
            <div className="flex gap-5">
                <div className="rounded-md border bg-white p-3 w-3/4">
                    <FilteredTable urlRefresh="auth.company.index" onSearchChange={handleSearchChange} />            
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        striped
                        dense
                        highlightOnHover
                        pagination
                    />
                </div>
                <div className="w-1/4">
                    <h1 className="text-gray-800 text-lg font-semibold">About Companies</h1>
                    <p className="text-gray-800 font-light">You can use companies as a simple informative field, or you can use them to restrict asset visibility and availability to users with a specific company by enabling Full Company Support in your Admin Settings.</p>
                </div>
            </div>
        </Guest>
    )
}