import ButtonActionTable from "@/Components/ButtonActionTable";
import FilteredTable from "@/Components/FilteredTable";
import Header from "@/Components/Header";
import Loading from "@/Components/Loading";
import { Toast } from "@/Components/Toast";
import Guest from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { SweetAlertIcon } from "sweetalert2";

interface ModelProps {
    id: number;
    name: string;
    model_no: string;
    min_qty: string;
    image: string;
    category_id: string;
    depreciation_id: string;
    manufacturer: {
        name: string;
    },
    category: {
        id: string;
        name: string;
    }
    fieldset: {
        id: string;
        name: string;
    }
}

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}

interface IndexProps {
    models: ModelProps[];
    flashMessage: FlashMessageProps;
}
 
export default function Index({models,flashMessage}: IndexProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(true);

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };

    const filteredData = models.filter((row) => 
        row.name.toLowerCase().includes(searchText.toLowerCase())
    );

    

    const columns = [
        {
            name: 'Name',
            selector: (row: ModelProps) => row.name,
            cell: (row:ModelProps) => (
                <Link href="" className="text-cyan-600 hover:text-cyan-700">{`${row.manufacturer.name} - ${row.name}`}</Link>
            ),
            sortable:true,
        },
        {
            name: 'Image',
            cell: (row: ModelProps) => (
                <img src={row.image} alt="" className="h-12 py-2"/>
            )
        },
        {
            name: 'Model No.',
            selector: (row: ModelProps) => row.model_no,
            sortable:true,
        },
        {
            name: 'Min. Qty',
            selector: (row: ModelProps) => row.min_qty || 0,
            sortable:true,
        },
        {
            name: 'Category',
            selector: (row: ModelProps) => row.category.name,
            cell: (row:ModelProps) => (
                <Link href={route('auth.category.edit',row.category.id)} className="text-cyan-600 hover:text-cyan-700">{`${row.category.name}`}</Link>
            ),
            sortable:true,
        },
        {
            name: 'Fieldset',
            selector: (row: ModelProps) => row.fieldset?.name,
            cell: (row:ModelProps) => (
                row.fieldset?.id ? (
                    <Link href={route('auth.fieldset.edit',row.fieldset.id)} className="text-cyan-600 hover:text-cyan-700">{`${row.fieldset.name}`}</Link>
                ):(
                    <div className="">No Custom Fields</div>
                )
            ),
            sortable:true,
        },
        {
            name: 'Actions',
            cell: (row: ModelProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.model-device.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.model-device.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
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
            <Header label="View Models" url="auth.model-device.create">
                <div className="inline-flex items-center">
                    <IoAdd/>
                    Create
                </div>
            </Header>
            <div className="flex gap-5">
                <div className="rounded-md border bg-white p-3 w-full">
                    <FilteredTable urlRefresh="auth.model-device.index" onSearchChange={handleSearchChange} />            
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