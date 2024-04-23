import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/slice";

export const useStateValue: any = () => {
  const state = useSelector<{ user: AppState }>((state) => state.user);
  const dispatch = useDispatch();
  return { state, dispatch };
};
