import "./styles.css";
import Auth from "./Component/auth";

export default function App() {
  return (
    <div className="App">
      <h1>Hello From Youtube API</h1>
      <h2>Login to see the suggested videos</h2>
      <Auth />
    </div>
  );
}
