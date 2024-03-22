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

interface FieldProps {
    id: number;
    name: string;
}

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}

interface IndexProps {
    fieldsets: FieldProps[];
    fields: FieldProps[];
    flashMessage: FlashMessageProps;
}
 
export default function Index({fieldsets,fields,flashMessage}: IndexProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [searchTextField, setSearchTextField] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(true);

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };
    const handleSearchFieldChange = (newSearchText: string) => {
        setSearchTextField(newSearchText);
    };


    const filteredData = fieldsets.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredFieldData = fields.filter((row) =>
        row.name.toLowerCase().includes(searchTextField.toLowerCase())
    );

   

    const columns = [
        {
            name: 'Name',
            selector: (row: FieldProps) => row.name,
            cell: (row: FieldProps) => (
                <Link href={route('auth.fieldset.edit',row.id)} className="text-cyan-600 hover:text-cyan-700">{row.name}</Link>
            )
        },
        {
            name: 'Actions',
            cell: (row: FieldProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.fieldset.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.fieldset.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
                        <HiOutlinePencilSquare/>
                    </ButtonActionTable>
                </div>
            ),
        },
    ];
    const columnFields = [
        {
            name: 'Name',
            selector: (row: FieldProps) => row.name,
        },
        {
            name: 'Actions',
            cell: (row: FieldProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.field.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.field.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
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
            
            <div className="mb-5">
                <Header label="Fieldsets" url="auth.fieldset.create">
                    <div className="inline-flex items-center">
                        <IoAdd/>
                        New Fieldset
                    </div>
                </Header>
                <div className="rounded-md border bg-white p-3 w-3/4">
                    <FilteredTable urlRefresh="auth.field.index" onSearchChange={handleSearchChange} exportData={false}/>            
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
            <div className="">
                <Header label="Custom Fields" url="auth.field.create">
                    <div className="inline-flex items-center">
                        <IoAdd/>
                        New Custom Field
                    </div>
                </Header>
                <div className="rounded-md border bg-white p-3 w-3/4">
                    <FilteredTable urlRefresh="auth.field.index" onSearchChange={handleSearchFieldChange} exportData={false}/>            
                    {loading ? (
                        <Loading/>
                    ):(
                        <DataTable
                            columns={columnFields}
                            data={filteredFieldData}
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