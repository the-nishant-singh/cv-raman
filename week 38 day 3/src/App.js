import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { getOlder, getYounger } from "./Action/action";

export default function App() {
  const state = useSelector((state) => state.updateAge);
  console.log(">>>", state);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Redux Counter</h1>
      <button
        onClick={() => {
          dispatch(getYounger(2));
        }}
      >
        Get Younger
      </button>
      <span>Your Age: {state.age}</span>
      <button
        onClick={() => {
          dispatch(getOlder(5));
        }}
      >
        Get Older
      </button>
    </div>
  );
}
