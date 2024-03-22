import ButtonActionTable from "@/Components/ButtonActionTable";
import FilteredTable from "@/Components/FilteredTable";
import Header from "@/Components/Header";
import Loading from "@/Components/Loading";
import { Toast } from "@/Components/Toast";
import Guest from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";
import { LucideExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { SweetAlertIcon } from "sweetalert2";

interface ManufacturerProps {
    id: number;
    name: string;
    url: string;
    support_url: string;
    support_phone: string;
    support_email: string;
    image: string;
}

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}

interface IndexProps {
    manufacturers: ManufacturerProps[];
    flashMessage: FlashMessageProps;
}
 
export default function Index({manufacturers,flashMessage}: IndexProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(true);

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };
    
    const filteredData = manufacturers.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.support_phone?.toLowerCase().includes(searchText.toLowerCase()) ||
        row.support_email?.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            name: 'Name',
            selector: (row: ManufacturerProps) => row.name,
            sortable:true,
        },
        {
            name: 'Image',
            cell: (row: ManufacturerProps) => (
                <img src={row.image} alt="" className="h-10 my-2"/>
            ),
        },
        {
            name: 'Url',
            selector: (row: ManufacturerProps) => row.url,
            cell: (row: ManufacturerProps) => (
                <a href={row.url} target="_BLANK" className="flex items-center text-cyan-600 hover:text-cyan-700">
                    <LucideExternalLink className="mr-1 h-5 w-5"/>
                    {row.url}
                </a>
            ),
            sortable:true,
        },
        {
            name: 'Support Url',
            selector: (row: ManufacturerProps) => row.support_url,
            cell: (row: ManufacturerProps) => (
                row.support_url ? (
                    <a href={row.support_url} target="_BLANK" className="flex items-center text-cyan-600 hover:text-cyan-700">
                        <LucideExternalLink className="mr-1 h-5 w-5"/>
                        {row.support_url}
                    </a>
                ):(
                    <div className="">-</div>
                )
            ),
            sortable:true,
        },
        {
            name: 'Phone',
            selector: (row: ManufacturerProps) => row.support_phone || '-',
            sortable:true,
        },
        {
            name: 'Email',
            selector: (row: ManufacturerProps) => row.support_email || '-',
            sortable:true,
        },
        {
            name: 'Actions',
            cell: (row: ManufacturerProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.manufacture.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.manufacture.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
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
            <Header label="Asset Manufacturers" url="auth.manufacture.create">
                <div className="inline-flex items-center">
                    <IoAdd/>
                    Create
                </div>
            </Header>
            <div className="flex gap-5">
                <div className="rounded-md border bg-white p-3 w-full">
                    <FilteredTable urlRefresh="auth.manufacture.index" onSearchChange={handleSearchChange} />            
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