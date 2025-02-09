import { RootState } from "@/store/redux-store";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>()
