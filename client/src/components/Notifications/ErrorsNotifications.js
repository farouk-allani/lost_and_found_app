import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors } from "../../JS/actions/user";

const ErrorsNotifications = ({ errors }) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      dispatch(clearErrors());
    }, 3000);
  }, [show, dispatch]);
  return (
    <div>
      {show && <p hidden> {toast.error(errors.msg)}</p>}
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ErrorsNotifications;
