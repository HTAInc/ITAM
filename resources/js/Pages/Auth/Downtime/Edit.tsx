import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { DOWNTIME_CATEGORIES_DATA } from "@/Constants/Index";
import Guest from "@/Layouts/GuestLayout";
import { formatDate } from "@/lib/utils";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { FaCheck } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import Select from 'react-select';
import internal from "stream";
import Swal from "sweetalert2";

interface CategoryProps {
    value:string;
    label:string;
}

interface DowntimeProps {
    id:string;
    category:string;
    downtime: string;
    uptime: string;
    total: number;
    issue: string;
    remark: string;
}

interface EditProps {
    downtime: DowntimeProps;
    category: CategoryProps
}

export default function Edit({downtime}:EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        category: downtime.category,
        downtime: formatDate(downtime.downtime,"yyyy-MM-dd'T'HH:mm"),
        uptime: formatDate(downtime.uptime,"yyyy-MM-dd'T'HH:mm"),
        total: downtime.total,
        issue: downtime.issue,
        remark: downtime.remark,
    }); 

    const categoryOptions = DOWNTIME_CATEGORIES_DATA.map((item: CategoryProps) => ({
        value:item.value,
        label:item.label,
    }))

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            text: 'Save?',
            icon: 'info',
            showCancelButton: true,
            showConfirmButton:true,
            confirmButtonText:'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                put(route("auth.downtime.update", downtime.id));
            }
        });
        
    };
    return (
        <Guest>
            <div className="flex w-full justify-center pt-10">
                <form onSubmit={submit} className="w-1/3 rounded-xl">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Edit Downtime</CardTitle>
                            {/* <CardDescription>Start placement for assets.</CardDescription> */}
                        </CardHeader>
                        <CardContent>   
                            <div className="mb-3">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    name="category"
                                    options={categoryOptions}
                                    isClearable={true}
                                    placeholder="Select Category"
                                    className="mt-1 block w-full"
                                    value={categoryOptions.find(option => option.value === data.category)}
                                    onChange={selectedOption => setData('category', selectedOption ? selectedOption.value : '')}
                                />

                                <InputError message={errors.category} className="mt-2" />
                            </div>                                     
                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div className="">
                                    <Label htmlFor="downtime">Downtime</Label>
                                    <Input
                                        type="datetime-local"
                                        placeholder="downtime"
                                        className="block"
                                        value={data.downtime}
                                        onChange={(e) => setData('downtime', e.target.value)}
                                        />

                                    <InputError message={errors.downtime} className="mt-2" />
                                </div>
                                <div className="">
                                    <Label htmlFor="uptime">Uptime</Label>
                                    <Input
                                        type="datetime-local"
                                        placeholder="uptime"
                                        className="block"
                                        value={data.uptime}
                                        onChange={(e) => setData('uptime', e.target.value)}
                                        />

                                    <InputError message={errors.uptime} className="mt-2" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="issue">Issue</Label>
                                <Textarea
                                    placeholder="issue"
                                    className="block"
                                    value={data.issue || ''}
                                    onChange={(e) => setData('issue', e.target.value)}
                                    />

                                <InputError message={errors.issue} className="mt-2" />
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="remark">Remark</Label>
                                <Textarea
                                    placeholder="remark"
                                    className="block"
                                    value={data.remark || ''}
                                    onChange={(e) => setData('remark', e.target.value)}
                                    />

                                <InputError message={errors.remark} className="mt-2" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => router.get(route('auth.downtime.index'))}>
                                <TiArrowBack className="mr-1"/>
                                Cancel
                            </Button>
                            <Button className="bg-cyan-600 text-white px-3 py-1 hover:bg-cyan-500 rounded flex items-center gap-1" type="submit"  disabled={processing}>
                                <FaCheck className="mr-1" />
                            Save</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
            
        </Guest>
    )
}