import { useState } from "react";

const snackbarInitState = {
    isOpen: false,
    message: "",
};
export const useSnackbarState = () => {
    const [snackbarState, setSnackbarState] = useState(snackbarInitState);
    return {
        snackbarState,
        setSnackbarState,
        snackbarInitState
    };
};
