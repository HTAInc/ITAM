import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Guest from '@/Layouts/GuestLayout';
import { Button } from '@/Components/ui/button';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <Guest>
                <h1 className='text-2xl text-gray-800'>Dashboard</h1>
            </Guest>
        </>
    );
}
