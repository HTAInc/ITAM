import { CgSpinner } from "react-icons/cg";

export default function Loading() {
    return (
        <div className="w-full h-full">
            <div className="w-full h-[333px] flex items-center justify-center bg-white">
                <CgSpinner className="animate-spin h-20 w-20 text-cyan-500 mb-5"/>
            </div>
        </div>
    )
}