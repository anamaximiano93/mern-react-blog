import IRoute from "../interfaces/route";
import BlogPage from "../pages/blog";
import EditPage from "../pages/edit";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";

const authRoutes: IRoute[] = [
  {
    path: "/login",
    name: "Login",
    exact: true,
    auth: false,
    component: LoginPage,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    auth: false,
    component: LoginPage,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    auth: false,
    component: LoginPage,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    auth: false,
    component: LoginPage,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    auth: false,
    component: LoginPage,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    auth: false,
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    exact: true,
    auth: false,
    component: LoginPage,
  },
];
const blogRoutes: IRoute[] = [
  {
    path: "/edit",
    name: "Edit",
    exact: true,
    auth: false,
    component: EditPage,
  },
  {
    path: "/edit/:blogID",
    name: "Edit",
    exact: true,
    auth: false,
    component: EditPage,
  },
  {
    path: "/blogs/:blogID",
    name: "Blog",
    exact: true,
    auth: false,
    component: BlogPage,
  },
];
const mainRoutes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    exact: true,
    auth: false,
    component: HomePage,
  },
];

const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes];

export default routes;
