import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import { Search, Main } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
