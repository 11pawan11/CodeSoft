import {lazy} from 'react';
const Skills = lazy(() => import ('./skills'));
const Experience = lazy(() => import ('./experience'));
const Education = lazy(() => import('./education'));


export const AboutMe = [
    {
        title : "Skills",
        link : "/skills",
        component : Skills,
              
    },


    {
        title : "Experience",
        link : "/experience",
        component: Experience,

    },

    {
        title: "Education",
        link : "/education",
        component : Education,
    },


];
