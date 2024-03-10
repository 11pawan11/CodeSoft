import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainHeader from './mainheader';
import About from './component/about';
import Footer from './component/footer';
import Services from './component/services';
import Mywork from './component/mywork';
import Certification from './component/certification';
import Header from './component/header';
import Login from './dashboard/login';
import DefaultLayout from './dashboard/defaultLayout';
import { Suspense } from 'react';
import Loader from './loader';
import routes from './dashboard/dashboard component/dashboardRoute';
import { ImageProvider } from './component/conext api/imageContext';
import { ToastProvider } from './component/conext api/toast';
import { EditPagesProvider } from './component/conext api/textEditApi';

const App = () => {
  return (
    <Router>
    <ToastProvider>
    <EditPagesProvider>
    <ImageProvider>
        <Routes>
          <Route path='/' element={<MainHeader />} />
          <Route path='/header' element={<Header />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/mywork' element={<Mywork />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/certifications' element={<Certification />} />
          <Route path='/login' element={<Login />} />

          <Route path='/defaultLayout' element={<DefaultLayout />} />

          <Route element={<DefaultLayout />}>
            {routes.map((route, index) => {
              const { link, component: Component } = route;
              return (
                <Route key={index} path={link} element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                } />
              );
            })}
          </Route>
        </Routes>
      </ImageProvider>
      </EditPagesProvider>
    </ToastProvider>
    </Router>
  );
}

export default App;
