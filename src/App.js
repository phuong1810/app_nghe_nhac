import "./App.css";
import React from "react";
import AlbumFeature from "./features/Album";
import { Route, Routes, Navigate } from "react-router-dom";
import Administrator from "./components/Administrator";
// import Home from './features/Home';
import NotFound from "./components/NotFound";
import UrlParams from "./features/UrlParams";
import CounterFeature from "./features/Counter";
import RegisterFeature from "./components/Administrator/Register";
import LoginFeature from "./components/Administrator/Login";
import CategoryFeature from "./components/Administrator/Category";
import CategoryAdd from "./components/Administrator/Category/Add";
import CategoryEdit from "./components/Administrator/Category/Edit";
import Member from "./components/Administrator/Member";
import Album from "./components/Administrator/Album";
import AlbumAdd from "./components/Administrator/Album/Add";
import AlbumEdit from "./components/Administrator/Album/Edit";

const PrivateRoute = ({ children, redirectTo }) => {
  let token = localStorage.getItem("jwtToken");

  if (token && token !== "undefined") {
    return children;
  }

  return <Navigate to={redirectTo} />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AlbumFeature />} />
        <Route path="/admin" element={<Administrator />} />
        <Route path="/admin/album" element={<Album />} />
        <Route path="/admin/album/add" element={<AlbumAdd />} />
        <Route path="/admin/album/edit/:id" element={<AlbumEdit />} />
        <Route path="/admin/register" element={<RegisterFeature />} />
        <Route path="/admin/login" element={<LoginFeature />} />
        <Route
          path="/admin/category"
          element={
            <PrivateRoute
              redirectTo={"/admin/login"}
              children={<CategoryFeature />}
            />
          }
        />
        <Route path="/admin/category/add" element={<CategoryAdd />} />
        <Route path="/admin/category/edit/:id" element={<CategoryEdit />} />
        <Route path="/admin/member" element={<Member />} />
        <Route path="url-params" element={<UrlParams />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/counter" element={<CounterFeature />} />
      </Routes>
    </div>
  );
}

export default App;
