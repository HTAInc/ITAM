import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import { RxTriangleDown } from "react-icons/rx";
import { SlRefresh } from "react-icons/sl";

interface FilteredTableProps {
    onSearchChange: (searchText: string) => void;
    urlRefresh: string;
    exportData?: boolean;
}

export default function FilteredTable({ onSearchChange, urlRefresh, exportData = true } : FilteredTableProps) {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
        onSearchChange(newSearchText);
    };

    return (
        <div className="flex justify-end w-full mb-2">
            <div className="flex items-center gap-3">
                <Input
                    placeholder="Search..."
                    type="search"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="rounded-none h-9 border-gray-300 text-gray-800 focus:border-cyan-600"
                />
                    <div className="flex">
                        <Link href={route(urlRefresh)} className="h-9 w-9 inline-flex items-center border justify-center bg-gray-100 border-gray-300 hover:bg-gray-200">
                            <SlRefresh/>
                        </Link>
                        {exportData && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="rounded-none h-9 px-2 border bg-gray-100 border-gray-300 hover:bg-gray-200">
                                        <IoMdDownload/>
                                        <RxTriangleDown/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-44 bg-white" align="end">
                                    <DropdownMenuLabel>Export</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                CSV
                                                <DropdownMenuShortcut>
                                                    <BsFiletypeCsv/>
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>     
                        )}
                    </div>
            </div>
        </div>
    )
}