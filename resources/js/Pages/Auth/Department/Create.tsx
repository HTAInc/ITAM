import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Guest from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { FaCheck } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import Select from 'react-select';
import Swal from "sweetalert2";

interface CompanyProps {
    id: string;
    name: string;
}

interface CreateProps {
    companies: CompanyProps[];
}


export default function Create({companies}: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        company_id: '',
        name: '',
        code: '',
    });

    const companyOptions = companies.map((item: CompanyProps) => ({
        value:item.id,
        label:item.name,
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
                post(route('auth.department.store'));
            }
        });
    };
    return (
        <Guest>
            <div className="flex w-full justify-center pt-10">
                <form onSubmit={submit} className="w-full md:w-1/2 rounded-xl">
                    <Card className="px-5">
                        <CardHeader>
                            <CardTitle>Create Department</CardTitle>
                        </CardHeader>
                        <CardContent>   
                            <div className="mb-3">
                                <Label htmlFor="company_id">Company</Label>
                                <Select
                                    name="company_id"
                                    options={companyOptions}
                                    isClearable={true}
                                    placeholder="Select Company"
                                    className="mt-1 block w-1/2"
                                    value={companyOptions.find(option => option.value === data.company_id)}
                                    onChange={selectedOption => setData('company_id', selectedOption ? selectedOption.value : '')}
                                />

                                <InputError message={errors.company_id} className="mt-2" />
                            </div>                                 
                            <div className="flex gap-3 mb-3 w-full">
                                <div className="grow">
                                    <Label htmlFor="name">Department Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        placeholder="Department Name"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="w-1/4">
                                    <Label htmlFor="name">Department Code</Label>
                                    <Input
                                        id="code"
                                        name="code"
                                        value={data.code}
                                        className="mt-1 block w-full"
                                        autoComplete="code"
                                        placeholder="Department Code"
                                        onChange={(e) => setData('code', e.target.value)}
                                    />

                                    <InputError message={errors.code} className="mt-2" />
                                </div>
                            </div>
                           
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => router.get(route('auth.department.index'))}>
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