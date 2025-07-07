import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import UpdateBook from "../pages/UpdateBook";
import BookShelf from "../pages/BookShelf";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../pages/BookDetails";
import Profile from "../pages/Profile";
import LoadingPage from "../pages/LoadingPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/add-book",
        element: <PrivateRoute>
          <AddBook />
        </PrivateRoute>
      },
      {
        path: "/my-books",
        element: <PrivateRoute>
          <MyBooks />
        </PrivateRoute>
      },
      {
        path: "/update-book/:id",
        element: <PrivateRoute>
          <UpdateBook />
        </PrivateRoute>
      },
      {
        path: "/bookshelf",
        Component: BookShelf
      },
      {
        path: "/book/:id",
        Component: BookDetails
      },
      {
        path: "/profile",
        element: <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    ]
  },
])

export default router;