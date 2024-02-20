import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainHeader from './mainheader';
import Header from './component/header';
import About from './component/about';
import Projects from './component/projects';
import Footer from './component/footer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainHeader />} />
        <Route path='/header' element={<Header />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/footer' element={<Footer/>}/>


         
      </Routes>
    </Router>
  );
}

export default App;
