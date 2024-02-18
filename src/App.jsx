import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainHeader from './mainheader';
import Header from './component/header';
import About from './component/about';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainHeader />} />
        <Route path='/header' element={<Header />} />
        <Route path='about' element={<About/>}/>
      </Routes>
    </Router>
  );
}

export default App;
