import Layout from "./Layout";
import Home from "./pages/Home";
import Versions from "./pages/Versions";
import { BrowserRouter, Route, Routes } from "react-router";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/versions" element={<Versions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
