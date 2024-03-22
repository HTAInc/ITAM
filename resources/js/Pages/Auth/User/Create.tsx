import Checkbox from "@/Components/Checkbox";
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

interface RoleProps {
    name: string;
}

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
    roles: RoleProps[];
}


export default function Create({companies,departments,sections,roles}: CreateProps) {
    const { data, setData, post, processing, errors,reset } = useForm({
        company_id: '',
        department_id: '',
        section_id: '',
        name: '',
        password: '',
        password_confirmation: '',
        email: '',
        role: '',
        credential: false,
    });

    const roleOptions = roles.map((item: RoleProps) => ({
        value:item.name,
        label:item.name,
    }))
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

    const handleGeneratePassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+';
        const passwordLength = 8;

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        setData(prevData => ({
            ...prevData,
            password: password,
            password_confirmation: password
        }))
    }

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

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

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
                post(route('auth.user.store'));
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
                            <div className="grid grid-cols-2 gap-5 mb-3 w-full">
                                <div className="w-full">
                                    <Label className="" htmlFor="company_id">Company</Label>
                                    <Select
                                        name="company_id"
                                        options={companyOptions}
                                        isClearable={true}
                                        placeholder="Select Company"
                                        className="mt-1 block"
                                        value={companyOptions.find(option => option.value === data.company_id) || null}
                                        onChange={selectedOption => setData('company_id', selectedOption ? selectedOption.value : '')}
                                    />

                                    <InputError message={errors.company_id} className="mt-2" />
                                </div>            
                                <div className="w-full">
                                    <Label className="" htmlFor="department_id">Department</Label>
                                    <Select
                                        name="department_id"
                                        options={departmentOptions}
                                        isClearable={true}
                                        placeholder="Select Department"
                                        className="mt-1 block"
                                        value={departmentOptions.find(option => option.value === data.department_id) || null}
                                        onChange={selectedOption => setData('department_id', selectedOption ? selectedOption.value : '')}
                                    />

                                    <InputError message={errors.department_id} className="mt-2" />
                                </div>      
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="mb-3">
                                    <Label className="" htmlFor="section_id">Section</Label>
                                    <Select
                                        name="section_id"
                                        options={sectionOptions}
                                        isClearable={true}
                                        placeholder="Select Section"
                                        className="mt-1 block"
                                        value={sectionOptions.find(option => option.value === data.section_id) || null}
                                        onChange={selectedOption => setData('section_id', selectedOption ? selectedOption.value : '')}
                                    />

                                    <InputError message={errors.section_id} className="mt-2" />
                                </div>                             
                                <div className="mb-3">
                                    <Label className="" htmlFor="role">Roles</Label>
                                    <Select
                                        name="role"
                                        options={roleOptions}
                                        isClearable={true}
                                        placeholder="Select Section"
                                        className="mt-1 block"
                                        value={roleOptions.find(option => option.value === data.role) || null}
                                        onChange={selectedOption => setData('role', selectedOption ? selectedOption.value : '')}
                                    />

                                    <InputError message={errors.role} className="mt-2" />
                                </div> 
                            </div>                   
                            <div className="mb-3 w-3/4">
                                <Label className="" htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block"
                                    autoComplete="name"
                                    placeholder="Full Name"
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="w-3/4 mb-3">
                                <div className="">
                                    <Label className="" htmlFor="name">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block"
                                        autoComplete="email"
                                        placeholder="Email Address"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <label className="flex items-center mt-2">
                                    <Checkbox
                                        name="credential"
                                        checked={data.credential}
                                        onChange={(e) => setData('credential', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Email this user their credentials?</span>
                                </label>
                                <p className="text-gray-500 font-light text-sm text-justify">You must provide an email address for this user to send them credentials. Emailing credentials can only be done on user creation. Passwords are stored in a one-way hash and cannot be retrieved once saved.</p>
                            </div>

                            <div className="mb-3">
                                <Label className="" htmlFor="password">Password</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-3/4"
                                        autoComplete="password"
                                        placeholder="Password"
                                        type="password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <div className="text-cyan-600 hover:text-cyan-700 cursor-pointer" onClick={() => handleGeneratePassword()}>Generate</div>
                                </div>
                                <div className="text-gray-800">{data.password}</div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="mb-3 w-3/4">
                                <Label className="" htmlFor="password">Password</Label>
                                <Input
                                        id="password"
                                        name="password"
                                        value={data.password_confirmation}
                                        className="mt-1 block"
                                        autoComplete="password_confirmation"
                                        placeholder="Password Confirmation"
                                        type="password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                                
                            
                           
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => router.get(route('auth.user.index'))}>
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