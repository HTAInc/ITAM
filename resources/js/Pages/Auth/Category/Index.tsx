import ButtonActionTable from "@/Components/ButtonActionTable";
import FilteredTable from "@/Components/FilteredTable";
import Header from "@/Components/Header";
import Loading from "@/Components/Loading";
import { Toast } from "@/Components/Toast";
import Guest from "@/Layouts/GuestLayout";
import { formatNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { SweetAlertIcon } from "sweetalert2";

interface CategoryProps {
    id: number;
    name: string;
    type: string;
    image: string;
    count_model: number;
}

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}

interface IndexProps {
    categories: CategoryProps[];
    flashMessage: FlashMessageProps;
}
 
export default function Index({categories,flashMessage}: IndexProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(true);

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };

    const filteredData = categories.filter((row) => 
        row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.type.toLowerCase().includes(searchText.toLowerCase())
    );

    

    const columns = [
        {
            name: 'Name',
            selector: (row: CategoryProps) => row.name,
            sortable:true,
        },
        {
            name: 'Image',
            cell: (row: CategoryProps) => (
                <img src={row.image} alt="" className="h-12 py-2"/>
            )
        },
        {
            name: 'Type',
            selector: (row: CategoryProps) => row.type,
            sortable:true,
        },
        {
            name: 'Qty',
            selector: (row: CategoryProps) => row.count_model || 0,
            sortable:true,
        },
        {
            name: 'Actions',
            cell: (row: CategoryProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.category.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.category.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
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
            <Header label="Categories" url="auth.category.create">
                <div className="inline-flex items-center">
                    <IoAdd/>
                    Create
                </div>
            </Header>
            <div className="flex gap-5">
                <div className="rounded-md border bg-white p-3 w-full">
                    <FilteredTable urlRefresh="auth.category.index" onSearchChange={handleSearchChange} />            
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