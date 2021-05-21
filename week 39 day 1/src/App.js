import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./Action/Action";

export default function App() {
  const state = useSelector((state) => state.updateData);
  console.log(state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const renderProducts = (data) => {
    if (data) {
      return data.map((item, key) => {
        return (
          <div className="card" key={key}>
            <img src={item.image} className="image" alt="product" />
            <div className="card__data">
              <h3>{item.title}</h3>
              <h4>{item.category}</h4>
              <h4>{item.description.slice(0, 400)}</h4>
            </div>

            <h3 className="price">${item.price}/-</h3>
          </div>
        );
      });
    }
  };

  return <div className="App">{renderProducts(state.items)}</div>;
}
