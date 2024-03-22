import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Guest from "@/Layouts/GuestLayout";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { FaCheck } from "react-icons/fa6";
import { TiArrowBack } from "react-icons/ti";
import Swal from "sweetalert2";
 
interface FieldProps {
    id: number;
    name: string;
}

interface FieldsetProps {
    id: number;
    name: string;
    fields: FieldProps[];
}

interface EditProps {
    fieldset: FieldsetProps;
    fields: FieldProps[];
}

export default function Edit({fieldset,fields}: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: fieldset.name,
        fields: fieldset.fields.map(field => field.id) 
    });

    const handleCheckboxChange = (id: number) => {
        setData(prevData => ({
            ...prevData,
            fields: prevData.fields.includes(id)
                ? prevData.fields.filter(fieldId => fieldId !== id)
                : [...prevData.fields, id]
        }));
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
                put(route('auth.fieldset.update', fieldset.id));
            }
        });
        
    };
    return (
        <Guest>
            <div className="flex w-full justify-center pt-10">
                <form onSubmit={submit} className="w-1/3 rounded-xl">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Create New Fieldset</CardTitle>
                            {/* <CardDescription>Start placement for assets.</CardDescription> */}
                        </CardHeader>
                        <CardContent>                                    
                            <div className="mb-3">
                                <Label htmlFor="name">Fieldset Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    placeholder="Field Name"
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="name" className="mb-3">Select Field : </Label>
                                <div className="space-y-2">
                                    {fields.map((item) => (
                                        <div className="flex items-center space-x-2" key={item.id}>
                                            <Checkbox
                                                name="fields[]"
                                                id={String(item.id)}
                                                checked={data.fields.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {item.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={() => router.get(route('auth.field.index'))}>
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