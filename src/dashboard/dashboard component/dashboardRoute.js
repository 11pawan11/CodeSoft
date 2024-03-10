import { lazy } from "react";
const AddSkills = lazy(() => import("./aboutsection/addSkills"));
const AddExperience = lazy(() => import ("./aboutsection/addExperience"));
const AddEducation = lazy(()=>import ("./aboutsection/addEducation"));
const AddImage = lazy(() => import ("./aboutsection/addimage"));
const AddText = lazy(() => import("./aboutsection/addtext"));
const Dashboard = lazy(()=> import ("./dashboard"));
const Notification = lazy(()=> import ("../notification"));


const routes = [
    {
        link: "/dashboard",
        title: "Dashboard",
        component: Dashboard
    },
    {
        link : "/addimage",
        title: "Add Image",
        component: AddImage,
    },
    {
        link: "/addtext",
        title: "Add Text",
        component: AddText
    },
    {
        link: "/notification",
        title: "Notification",
        component: Notification
    },
    {
        link: "/addSkills",
        title: "Add Skills",
        component: AddSkills
    },
    {
        link: "/addExperience",
        title: "Add Experience",
        component: AddExperience
    },  {
        link: "/addEducation",
        title: "Add Education",
        component: AddEducation
    }
];

export default routes;
