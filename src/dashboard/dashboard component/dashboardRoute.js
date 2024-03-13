import { lazy } from "react";
const Profile = lazy(() => import  ("./profile section/profile"));
const Settings = lazy (() => import("./profile section/profile_setting"));
const Logout = lazy(()=> import("./profile section/logout"));
const AddContact = lazy(() => import ("./contact section/addContact"));
const AddCertificate = lazy(() => import ("./certificate section/addCertificate"));
const AddWork = lazy (() => import ("./work section/addWork"));
const AddService = lazy(() => import ("./service section/addService"));
const AddSkills = lazy(() => import("./aboutsection/addSkills"));
const AddExperience = lazy(() => import ("./aboutsection/addExperience"));
const AddEducation = lazy(()=>import ("./aboutsection/addEducation"));
const AddImage = lazy(() => import ("./aboutsection/addimage"));
const AddText = lazy(() => import("./aboutsection/addtext"));
const Dashboard = lazy(()=> import ("./dashboard"));
const Notification = lazy(()=> import ("../notification"));
const MyAccount = lazy(()=> import ("./profile section/myaccount"));


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
    },  
    {
        link: "/addEducation",
        title: "Add Education",
        component: AddEducation
    },
    {
        link: "/addService",
        title: "Edit Service",
        component: AddService
    },
    {
        link: "/addWork",
        title: "Edit Work",
        component: AddWork
    },
    {
        link: "/addCertificate",
        title: "Edit Certification",
        component: AddCertificate
    },
    {
        link: "/addContact",
        title: "Edit Contact",
        component: AddContact
    },
    {
        link: "/profile",
        title: "My Profile",
        component: Profile
    },  {
        link: "/profile_setting",
        title: "Account Setting",
        component: Settings
    },  
    {
        link: "/logout",
        title: "Logout",
        component: Logout
    },
    {
        link: "/myaccount",
        title: "My Account",
        component: MyAccount
    }


];

export default routes;
