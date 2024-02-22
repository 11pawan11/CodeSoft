import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainHeader from './mainheader';
import Header from './component/header';
import About from './component/about';
import Footer from './component/footer';
import Services from './component/services';
import Mywork from './component/mywork';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainHeader />} />
        <Route path='/header' element={<Header />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/mywork' element={<Mywork/>}/>
        <Route path='/footer' element={<Footer/>}/>


         
      </Routes>
    </Router>
  );
}

export default App;
