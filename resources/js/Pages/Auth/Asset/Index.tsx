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

interface AssetProps {
    id: number;
    category: string;
    downtime: string;
    uptime: string;
    total: number;
    availability: string;
    issue: string;
    remark: string;
    user: string;
}

interface FlashMessageProps {
    type: SweetAlertIcon;
    message: string;
}

interface IndexProps {
    assets: AssetProps[];
    flashMessage: FlashMessageProps;
}
 
export default function Index({assets,flashMessage}: IndexProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<Boolean>(true);

    const handleSearchChange = (newSearchText: string) => {
        setSearchText(newSearchText);
    };

    const filteredData = assets.filter((row) => {
        const category = row.category ? row.category.toLowerCase() : '';
        const issue = row.issue ? row.issue.toLowerCase() : '';
        const remark = row.remark ? row.remark.toLowerCase() : '';
    
        return category.includes(searchText.toLowerCase()) ||
               issue.includes(searchText.toLowerCase()) ||
               remark.includes(searchText.toLowerCase());
    });
    

    const columns = [
        {
            name: 'Name',
            selector: (row: AssetProps) => row.category,
        },
        {
            name: 'Downtime',
            selector: (row: AssetProps) => row.downtime,
        },
        {
            name: 'Uptime',
            selector: (row: AssetProps) => row.uptime,
        },
        {
            name: 'Total',
            selector: (row: AssetProps) => formatNumber(row.total),
        },
        {
            name: 'Availability',
            selector: (row: AssetProps) => row.availability,
        },
        {
            name: 'Issue',
            selector: (row: AssetProps) => row.issue,
        },
        {
            name: 'Remarks',
            selector: (row: AssetProps) => row.remark || '-',
        },
        {
            name: 'Actions',
            cell: (row: AssetProps) => (
                <div className="flex justify-center items-center gap-3 py-1">
                    <ButtonActionTable url="auth.downtime.destroy" id={row.id} action="delete" className="bg-yellow-500 hover:bg-yellow-600">
                        <IoTrashOutline/>
                    </ButtonActionTable>
                    <ButtonActionTable url="auth.downtime.edit" id={row.id} action="edit" className="bg-sky-500 hover:bg-sky-600">
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
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Guest>
            <Header label="Downtimes" url="auth.downtime.create">
                <div className="inline-flex items-center">
                    <IoAdd/>
                    Create
                </div>
            </Header>
            <div className="flex gap-5">
                <div className="rounded-md border bg-white p-3 w-full">
                    <FilteredTable urlRefresh="auth.downtime.index" onSearchChange={handleSearchChange} />            
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