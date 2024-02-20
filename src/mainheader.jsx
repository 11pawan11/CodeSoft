import React from 'react'
import Header from './component/header';
import About from './component/about';
import Projects from './component/projects';
import Footer from './component/footer';

const MainHeader = () => {
  return (
    <>
    <Header/>
    <About/>
    {/* <Projects/> */}
    <footer>
      <Footer/>
    </footer>
    </> 
 )
}

export default MainHeader;