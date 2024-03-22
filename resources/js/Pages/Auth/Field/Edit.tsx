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
    id: string;
    name: string;
}

interface EditProps {
    field: FieldProps;
}

export default function Edit({field}: EditProps) {
    const { data, setData,put, processing, errors } = useForm({
        name: field.name,
    });

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
                put(route("auth.field.update", field.id));
            }
        });
        
    };
    return (
        <Guest>
            <div className="flex w-full justify-center pt-10">
                <form onSubmit={submit} className="w-1/3 rounded-xl">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>
                                Edit :
                                <span className="text-cyan-600 ml-1">{field.name}</span>
                            </CardTitle>
                            {/* <CardDescription>Start Tracking Asset Depreciation.</CardDescription> */}
                        </CardHeader>
                        <CardContent>                                    
                            <div className="mb-3">
                                <Label htmlFor="name">Field Name</Label>
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