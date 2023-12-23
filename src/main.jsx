import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./pages/error-page.jsx";
import Login from "./pages/login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: ErrorPage,
    },
    {
        path: "/login",
        element: <Login />,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);