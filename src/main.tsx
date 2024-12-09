import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import SearchResult from "./pages/SearchResult.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<App/>}/>
              {/*<Route path={'search/'} element={<SearchResult/>}/>*/}
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
