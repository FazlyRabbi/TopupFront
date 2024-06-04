import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const showAlert = (status) => {
  const router = useRouter();

  if (status === "success") {
    Swal.fire({
      title: "Payment Done!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/");
      }
    });
  } else {
    Swal.fire({
      title: "Payment Cancelled!",
      icon: "error",
    }).then((result) => {
      // Add result parameter here
      if (result.isConfirmed) {
        router.push("/");
      }
    });
  }
};

export default showAlert;
