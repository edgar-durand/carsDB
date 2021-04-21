/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import TableList from "./views/vehicles/TableList.js";
import UserProfile from "views/UserProfile.js";
import i18n from "./i18n";


let Routes = () => {
        const {dashboard, 'user-profile': userProfile, tables} = sessionStorage.getItem('locale') ?
            JSON.parse(sessionStorage.getItem(sessionStorage.getItem('locale')))['header']['title'] :
            i18n[i18n.default]['header']['title'];
    return ([
        {
            path: "/dashboard",
            name: dashboard,
            rtlName: "لوحة القيادة",
            icon: "tim-icons icon-chart-pie-36",
            component: Dashboard,
            layout: "/admin",
        },
        {
            path: "/tables",
            name: tables,
            rtlName: "قائمة الجدول",
            icon: "tim-icons icon-bus-front-12",
            component: TableList,
            layout: "/admin",
        },
        {
            path: "/user-profile",
            name: userProfile,
            rtlName: "ملف تعريفي للمستخدم",
            icon: "tim-icons icon-single-02",
            component: UserProfile,
            layout: "/admin",
        }
    ])
};
export default Routes;
