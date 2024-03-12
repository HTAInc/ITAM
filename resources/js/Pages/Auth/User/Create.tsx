import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Guest from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import Select from 'react-select';
import Swal from "sweetalert2";

interface CompanyProps {
    id: string;
    name: string;
}

interface DepartmentProps {
    id: string;
    name: string;
    company_id: string;
}

interface SectionProps {
    id: string;
    name: string;
    department_id: string;
}

interface CreateProps {
    companies: CompanyProps[];
    departments: DepartmentProps[];
    sections: SectionProps[];
}


export default function Create({companies,departments,sections}: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        company_id: '',
        department_id: '',
        section_id: '',
        name: '',
        email: '',
    });

    const companyOptions = companies.map((item: CompanyProps) => ({
        value:item.id,
        label:item.name,
    }))

    const departmentOptions = departments
        .filter((item: DepartmentProps) => item.company_id === data.company_id)
        .map((item: DepartmentProps) => ({
        value:item.id,
        label:item.name,
    }))

    const sectionOptions = sections
        .filter((item: SectionProps) => item.department_id === data.department_id)
        .map((item: SectionProps) => ({
            value:item.id,
            label:item.name,
    }))

    useEffect(() => {
        if(data.company_id === ''){
            setData(prevData => ({
                ...prevData,
                department_id:'',
                section_id: ''
            }));
        }else if(data.department_id === ''){
            setData(prevData => ({
                ...prevData,
                section_id: ''
            }));
        }
    },[data.company_id,data.department_id])

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
                            <CardTitle>Create User</CardTitle>
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
                                    value={companyOptions.find(option => option.value === data.company_id) || null}
                                    onChange={selectedOption => setData('company_id', selectedOption ? selectedOption.value : '')}
                                />

                                <InputError message={errors.company_id} className="mt-2" />
                            </div>            
                            <div className="mb-3">
                                <Label htmlFor="department_id">Department</Label>
                                <Select
                                    name="department_id"
                                    options={departmentOptions}
                                    isClearable={true}
                                    placeholder="Select Department"
                                    className="mt-1 block w-1/2"
                                    value={departmentOptions.find(option => option.value === data.department_id) || null}
                                    onChange={selectedOption => setData('department_id', selectedOption ? selectedOption.value : '')}
                                />

                                <InputError message={errors.department_id} className="mt-2" />
                            </div>      
                            <div className="mb-3">
                                <Label htmlFor="section_id">Section</Label>
                                <Select
                                    name="section_id"
                                    options={sectionOptions}
                                    isClearable={true}
                                    placeholder="Select Section"
                                    className="mt-1 block w-1/2"
                                    value={sectionOptions.find(option => option.value === data.section_id) || null}
                                    onChange={selectedOption => setData('section_id', selectedOption ? selectedOption.value : '')}
                                />

                                <InputError message={errors.section_id} className="mt-2" />
                            </div>                             
                            <div className="mb-3">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-1/2"
                                    autoComplete="name"
                                    placeholder="Full Name"
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="name">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-1/2"
                                    autoComplete="email"
                                    placeholder="Email Address"
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
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