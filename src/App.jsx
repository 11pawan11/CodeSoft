import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainHeader from './mainheader';
import Header from './component/header';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainHeader />} />
        <Route path='/header' element={<Header />} />
      </Routes>
    </Router>
  );
}

export default App;
