import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"

function NavBar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 flex justify-between my-1 py-5 px-10 rounded-lg">

            <Link to={isAuthenticated ? "/tasks" : "/"}>
                <h1 className="text-2xl font-bold" >Tasks Manager</h1>
            </Link>
            <ul className="flex gap-x-2">

                {isAuthenticated ? (
                    <>
                        <li>
                            Welcome {user.username}
                        </li>
                        <li>
                            <Link to="/add-tasks" className="bg-indigo-500 px-4 py-1 rounded-sm">Add task</Link>
                        </li>
                        <li>
                            <Link to="/add-tasks" onClick={() => {
                                logout()
                            }} className="bg-red-900 px-4 py-1 rounded-sm">Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm">Register</Link>
                        </li>
                    </>
                )
                }


            </ul>

        </nav>
    )
}

export default NavBar