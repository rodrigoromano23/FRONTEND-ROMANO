
/*import AppRouter from "./router/AppRouter";

export default function App() {
  return <AppRouter />;
}*/

import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}


