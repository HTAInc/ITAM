import Swal, { SweetAlertIcon } from "sweetalert2";

interface ToastProps {
  icon: SweetAlertIcon;
  title: string;
}

export const Toast = ({ icon, title }: ToastProps) => {
  return Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    icon, 
    title,
  });
};
