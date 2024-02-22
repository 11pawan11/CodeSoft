import React from 'react'
import Header from './component/header';
import About from './component/about';
import Footer from './component/footer';
import Services from './component/services';
import Mywork from './component/mywork';

const MainHeader = () => {

  const images = [
    '/logo.jpg',
    '/pasa.jpg', 
    '/pawan.jpg', 
    '/test.jpg',
    '/telegram.svg'
  ]
  
  return (
    <>
    <div className='overflow-hidden'>
    <Header/>
    <About/>
    <Services/>
    <Mywork images={images}/>
    <footer>
      <Footer/>
    </footer>
    </div>
    </> 
 )
}

export default MainHeader;