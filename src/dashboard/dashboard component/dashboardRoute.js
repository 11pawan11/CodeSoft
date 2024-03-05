import { lazy } from "react";

const AddImage = lazy(() => import ("./addimage"));
const AddText = lazy(() => import("./addtext"));
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
    }
];

export default routes;
