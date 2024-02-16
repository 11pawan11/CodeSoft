import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Helper = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion
        whileHover={{ scale: 1.1, backgroundColor: isHovered ? '#ff0000' : '#00ff00' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ duration: 0.5 }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
        }}
      />
    </>
  );
}

export default Helper; 
