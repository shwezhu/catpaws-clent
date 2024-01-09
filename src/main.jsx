import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import Home from "./components/home.jsx";
import PostDetailPage from "./components/PostDetailPage.jsx";
import Profile from "./components/profile.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/posts/:postId",
        element: <PostDetailPage />,
    },
    {
        path: "/users/:userId",
        element: <Profile />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);