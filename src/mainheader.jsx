import React from 'react'
import About from './component/about';
import Footer from './component/footer';
import Services from './component/services';
import Mywork from './component/mywork';
import Certification from './component/certification';
import Header from './component/header';

const MainHeader = () => {

  const images = [
    '/1.png',
    '/2.png', 
    '/3.png', 
    '/4.png',
  ]
  
  return (
    <>
    <div className='overflow-hidden'>
    <div className='bg-transparent'>
    <Header/>
    </div>
    <div className=''>
    <About/>
    </div>
    <Services/>
    <div className=''>
    <Mywork images={images}/>
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