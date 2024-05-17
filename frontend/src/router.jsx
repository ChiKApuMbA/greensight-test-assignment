import { createBrowserRouter } from "react-router-dom";
import Signup from "./views/Signup.jsx";


const router = createBrowserRouter([

    
    {
        path: "/",
        element: <Signup />
    },
])

export default router;