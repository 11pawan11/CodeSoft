import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainHeader from './mainheader';
import About from './component/about';
import Footer from './component/footer';
import Services from './component/services';
import Mywork from './component/mywork';
import Certification from './component/certification';
import Header from './component/header';
import Login from './dashboard/login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainHeader />} />
        <Route path='/header' element={<Header/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/mywork' element={<Mywork/>}/>
        <Route path='/footer' element={<Footer/>}/>
        <Route path='/certifications' element={<Certification/>}/>
        <Route path='/admin' element={<Login/>}/>



         
      </Routes>
    </Router>
  );
}

export default App;
