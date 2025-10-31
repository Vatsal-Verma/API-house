import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Element from './assets/components/Element.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './assets/components/Test.jsx';

function App() {
  return (
    <>
      {/* <Element /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Element/>}></Route>
          <Route path="/test" element={<Test />} />
          <Route path="/Test" element={<Test />} />  {/* add this if users might hit /Test */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
