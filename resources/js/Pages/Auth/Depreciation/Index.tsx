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

interface DepreciationProps {
    id: number;
    name: string;
    months: number;
}

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}
 
export default function Index({depreciations,flashMessage}: PageProps<{depreciations: DepreciationProps[], flashMessage: FlashMessageProps}>) {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };

    const filteredData = depreciations.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            name: 'Name',
            selector: (row: DepreciationProps) => row.name,
        },
        {
            name: 'Term (months)',
            selector: (row: DepreciationProps) => row.months,
        },
        {
            name: 'Actions',
            cell: (row: DepreciationProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.depreciation.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.depreciation.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
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
            <Header label="Depreciations" url="auth.depreciation.create">
                <div className="inline-flex items-center">
                    <IoAdd/>
                    Create
                </div>
            </Header>
            <div className="flex gap-5">
                <div className="rounded-md border bg-white p-3 w-3/4">
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
                <div className="w-1/4">
                    <h1 className="text-gray-800 text-lg font-semibold">About Asset Depreciations</h1>
                    <p className="text-gray-800 font-light">You can set up asset depreciations to depreciate assets based on straight-line depreciation.</p>
                </div>
            </div>
        </Guest>
    )
}