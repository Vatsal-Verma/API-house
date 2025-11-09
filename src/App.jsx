import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Element from './assets/components/Element/Element.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './assets/components/testing/Test.jsx';
import ApiPerformanceComparator from './assets/components/performance/ApiPerformanceComparator.jsx';
import Footer from './assets/components/footer/Footer.jsx'

function App() {
  return (
    <>
      {/* <Element /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Element/>}></Route>
          <Route path="/test" element={<Test />} />
          <Route path="/performance" element={<ApiPerformanceComparator />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
