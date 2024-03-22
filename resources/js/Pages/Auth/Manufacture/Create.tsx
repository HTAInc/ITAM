import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Guest from "@/Layouts/GuestLayout";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import Swal from "sweetalert2";
 
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        url: '',
        support_url: '',
        support_phone: '',
        support_email: '',
        image: null,
    });

    const handleFileChange = (e:any) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setData('image', file);
        } else {
            console.error('No file selected.');
        }
    };

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
                post(route('auth.manufacture.store'));
            }
        });
        
    };
    return (
        <Guest>
            <div className="flex w-full justify-center pt-10">
                <form onSubmit={submit} className="w-1/3 rounded-xl">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Create Manufacture</CardTitle>
                            {/* <CardDescription>Start placement for assets.</CardDescription> */}
                        </CardHeader>
                        <CardContent>                                    
                            <div className="mb-3">
                                <Label htmlFor="name">Manufacture Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    placeholder="Manufacture Name"
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="url">Url</Label>
                                <Input
                                    id="url"
                                    name="url"
                                    value={data.url}
                                    className="mt-1 block w-full"
                                    autoComplete="url"
                                    placeholder="Url"
                                    onChange={(e) => setData('url', e.target.value)}
                                />

                                <InputError message={errors.url} className="mt-2" />
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="support_url">Support Url</Label>
                                <Input
                                    id="support_url"
                                    name="support_url"
                                    value={data.support_url}
                                    className="mt-1 block w-full"
                                    autoComplete="support_url"
                                    placeholder="Support Url"
                                    onChange={(e) => setData('support_url', e.target.value)}
                                />

                                <InputError message={errors.support_url} className="mt-2" />
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="support_phone">Support Phone</Label>
                                <Input
                                    id="support_phone"
                                    name="support_phone"
                                    value={data.support_phone}
                                    className="mt-1 block w-full"
                                    autoComplete="support_phone"
                                    placeholder="Support Phone"
                                    onChange={(e) => setData('support_phone', e.target.value)}
                                />

                                <InputError message={errors.support_phone} className="mt-2" />
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="support_email">Support Email</Label>
                                <Input
                                    id="support_email"
                                    name="support_email"
                                    type="email"
                                    value={data.support_email}
                                    className="mt-1 block w-full"
                                    autoComplete="support_email"
                                    placeholder="Support Email"
                                    onChange={(e) => setData('support_email', e.target.value)}
                                />

                                <InputError message={errors.support_phone} className="mt-2" />
                            </div>

                            <div className="mb-3">
                                <Label htmlFor="image">Image</Label>
                                {data.image ? (
                                    <div className="relative w-1/2">
                                        <img src={URL.createObjectURL(data.image)} alt="" />
                                        <button className="absolute -right-2 -top-2 px-2 py-2 text-rose-600 bg-rose-100 rounded-full hover:bg-rose-200" onClick={() => setData('image', null)}>
                                            <AiOutlineClose/>
                                        </button>
                                    </div>
                                ):(
                                   <div className="">
                                        <TextInput
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 border-none appearance-none shadow-none block w-fit text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:shadow-none
                                                file:text-sm file:font-semibold
                                                file:bg-violet-50 file:text-cyan-700
                                                hover:file:bg-cyan-100"
                                            onChange={handleFileChange}
                                        />
                                        <small className="text-gray-600 font-light">Accepted filetypes are jpg, webp, png, gif, and svg. Max upload size allowed is 2M.</small>
                                   </div>
                                )}
                                <InputError message={errors.image} className="mt-2" />
                            </div>     
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => router.get(route('auth.manufacture.index'))}>
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