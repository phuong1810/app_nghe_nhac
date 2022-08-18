import './App.css';
import React, { useEffect } from 'react';
import AlbumFeature from './features/Album';
import { Route, Routes, Link, NavLink } from 'react-router-dom';
import Administrator from './components/Administrator';
import Home from './features/Home';
import NotFound from './components/NotFound';
import UrlParams from './features/UrlParams';
import productApi from './api/productApi';
import CounterFeature from './features/Counter';
import RegisterFeature from './components/Administrator/Register';
import LoginFeature from './components/Administrator/Login';
import CategoryFeature from './components/Administrator/Category';
import CategoryAdd from './components/Administrator/Category/Add';
import Member from './components/Administrator/Member';
import Album from './components/Administrator/Album';
import AlbumAdd from './components/Administrator/Album/Add';


function App() {
  useEffect(()=>{
    const fetchProducts = async()=>{
      const params = {
        _limit:10
      }
      const productList = await productApi.getAll(params)
      console.log(productList);
    }
    fetchProducts();
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AlbumFeature />} />
        <Route path="/admin" element={<Administrator/>} />
        <Route path="/admin/album" element={<Album/>} />
        <Route path="/admin/album/add" element={<AlbumAdd/>} />
        <Route path="/admin/register" element={<RegisterFeature/>} />
        <Route path="/admin/login" element={<LoginFeature />} />
        <Route path="/admin/category" element={<CategoryFeature />} />
        <Route path="/admin/category/add" element={<CategoryAdd />} />
        <Route path="/admin/member" element={<Member />} />
        {/* <Route path="/album" element={<AlbumFeature />} /> */}
        <Route path="url-params" element={<UrlParams />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/counter" element={<CounterFeature/>}/>
      </Routes>
    </div >

  );
}

export default App;
