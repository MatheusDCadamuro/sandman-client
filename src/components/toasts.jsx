import { Toaster, toast } from "sonner";

export default function Toasts() {
    const showToast = () => {
        toast("Hello, world!");
    };
    
    return (
        <div>
        <button onClick={showToast}>Show Toast</button>
        <Toaster />
        </div>
    );
}