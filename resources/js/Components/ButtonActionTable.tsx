import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

interface ButtonDeleteProps {
    action: 'delete' | 'edit',
    url: string,
    id: number,
    className:string,
    children: React.ReactNode
}

export default function ButtonActionTable({action,url,id,className,children}: ButtonDeleteProps) {
    const {delete: destroy} = useForm();
    const handleAction = (action: 'delete' | 'edit') => {
        if(action ==='delete'){    
            Swal.fire({
                text: 'Delete?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: true,
                showConfirmButton:false,
                denyButtonText: 'Yes, Delete',
            }).then((result) => {
                if (result.isDenied) {
                    destroy(route(url,id))
                }
            });
        }else if(action === 'edit'){
            router.get(route(url,id))
        }
    }

    return(
        <button onClick={()=>handleAction(action)} className={`p-2 text-sm rounded text-white border ${className}`}>
            {children}
        </button>
    )
}