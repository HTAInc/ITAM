import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { CATEGORY_TYPE_DATA } from "@/Constants/Index";
import Guest from "@/Layouts/GuestLayout";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import Select from 'react-select';
import Swal from "sweetalert2";

interface OptionProps {
    id: string;
    name:string;
    image:string;
}

interface Props {
    categories: OptionProps[],
    manufacturers: OptionProps[],
    depreciations: OptionProps[],
    fieldsets: OptionProps[],
}

export default function Create({categories,manufacturers,depreciations,fieldsets}:Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        manufacturer_id: '',
        depreciation_id: '',
        fieldset_id: '',
        model_no: '',
        min_qty: '',
        notes: '',
        image: null,
    });

    const categoryOptions = categories.map((item: OptionProps) => ({
        value:item.id,
        label:item.name,
    }))
    const manufacurerOptions = manufacturers.map((item: OptionProps) => ({
        value:item.id,
        label:item.name,
    }))
    const depreciationOptions = depreciations.map((item: OptionProps) => ({
        value:item.id,
        label:item.name,
    }))

    depreciationOptions.unshift({
        value: '',
        label: 'Do Not Depreciate',
    });
    const fieldsetOptions = fieldsets.map((item: OptionProps) => ({
        value:item.id,
        label:item.name,
    }))

    fieldsetOptions.unshift({
        value: '',
        label: 'No Custom Fields',
    });
    const handleFileChange = (e:any) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setData('image', file); // Set the file object directly
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
                post(route('auth.model-device.store'));
            }
        });
        
    };
    return (
        <Guest>
            <div className="flex w-full justify-center pt-10">
                <form onSubmit={submit} className="w-full md:w-1/2 rounded-xl">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Create Model Asset</CardTitle>
                            {/* <CardDescription>Start placement for assets.</CardDescription> */}
                        </CardHeader>
                        <CardContent>  
                            <div className="grid grid-cols-2 gap-5 mb-3">
                                <div className="">
                                    <Label htmlFor="category_id">Category</Label>
                                    <Select
                                        name="category_id"
                                        options={categoryOptions}
                                        isClearable={true}
                                        placeholder="Select Category"
                                        className="mt-1 block w-full"
                                        value={categoryOptions.find(option => option.value === data.category_id)}
                                        onChange={selectedOption => setData('category_id', selectedOption ? selectedOption.value : '')}
                                    />

                                    <InputError message={errors.category_id} className="mt-2" />
                                </div>   
                                <div className="">
                                    <Label htmlFor="manufacturer_id">Manufacturer</Label>
                                    <Select
                                        name="manufacturer_id"
                                        options={manufacurerOptions}
                                        isClearable={true}
                                        placeholder="Select Manufacturer"
                                        className="mt-1 block w-full"
                                        value={manufacurerOptions.find(option => option.value === data.manufacturer_id)}
                                        onChange={selectedOption => setData('manufacturer_id', selectedOption ? selectedOption.value : '')}
                                    />

                                    <InputError message={errors.manufacturer_id} className="mt-2" />
                                </div>  
                            </div>

                            <div className="grid grid-cols-2 gap-5 mb-3">
                                <div className="">
                                    <Label htmlFor="name">Model Name</Label>
                                    <Input
                                        placeholder="Model Name"
                                        className="block"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>  

                                <div className="">
                                    <Label htmlFor="name">Model Number</Label>
                                    <Input
                                        placeholder="Model Number"
                                        className="block"
                                        value={data.model_no}
                                        onChange={(e) => setData('model_no', e.target.value)}
                                        />

                                    <InputError message={errors.model_no} className="mt-2" />
                                </div> 
                            </div>

                            <div className="grid grid-cols-2 gap-5 mb-3">
                                <div className="">
                                    <Label htmlFor="depreciation_id">Depreciation</Label>
                                    <Select
                                        name="depreciation_id"
                                        options={depreciationOptions}
                                        // isClearable={true}
                                        placeholder="Select Depreciation"
                                        className="mt-1 block w-full"
                                        value={depreciationOptions.find(option => option.value === data.depreciation_id)}
                                        onChange={selectedOption => setData('depreciation_id', selectedOption ? selectedOption.value : '')}
                                    />

                                    <InputError message={errors.depreciation_id} className="mt-2" />
                                </div>  

                                <div className="">
                                    <Label htmlFor="fieldset_id">Fieldset</Label>
                                    <Select
                                        name="fieldset_id"
                                        options={fieldsetOptions}
                                        // isClearable={true}
                                        placeholder="Select Fieldset"
                                        className="mt-1 block w-full"
                                        value={fieldsetOptions.find(option => option.value === data.fieldset_id)}
                                        onChange={selectedOption => setData('fieldset_id', selectedOption ? selectedOption.value : '')}
                                    />

                                    <InputError message={errors.fieldset_id} className="mt-2" />
                                </div>  
                            </div>

                            

                            

                            <div className="mb-3">
                                <Label htmlFor="min_qty">Min QTY</Label>
                                <Input
                                    placeholder="Min QTY"
                                    className="block w-1/4"
                                    type="number"
                                    value={data.min_qty}
                                    onChange={(e) => setData('min_qty', e.target.value)}
                                    />

                                <InputError message={errors.min_qty} className="mt-2" />
                            </div> 

                            <div className="mb-3">
                                <Label htmlFor="name">Notes</Label>
                                <Textarea
                                    placeholder="Notes"
                                    className="block"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    />

                                <InputError message={errors.notes} className="mt-2" />
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
                            <Button type="button" variant="outline" onClick={() => router.get(route('auth.model-device.index'))}>
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