import React from 'react'
import About from './component/about';
import Footer from './component/footer';
import Services from './component/services';
import Mywork from './component/mywork';
import Certification from './component/certification';
import Header from './component/header';

const MainHeader = () => {

  
  
  return (
    <>
    <div className='overflow-hidden bg-black'>
    <div className='bg-transparent'>
    <Header/>
    </div>
    <div className=''>
    <About/>
    </div>
    <Services/>
    <div className='bg-black'>
    <Mywork/>
    </div>
    <Certification/>
    <footer className=''>
      <Footer/>
    </footer>
    </div>
    </> 
 )
}

export default MainHeader;