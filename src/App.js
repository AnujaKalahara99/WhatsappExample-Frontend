import NavigationAppBar from "./components/NavigationAppBar";
import NavigationDrawer from "./components/NavigationDrawer";
//import SendPage from "./pages/SendPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import CreateAd from "./pages/CreateAd";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="container-flex">
      <BrowserRouter>
        <NavigationAppBar />
        <NavigationDrawer />
        <Box component="main" sx={{ flexGrow: 1, pl: 31, pt: 9 }}>
          <Routes>
            <Route path={"/"} element={<Dashboard />} />
            <Route path={"/createAd"} element={<CreateAd />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
