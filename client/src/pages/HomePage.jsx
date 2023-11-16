
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <p>Home Page</p>
            <p className="flex gap-x-2 justify-between">
                <Link to="/login" className="text-sky-500"> ir al login </Link>
            </p>

        </div>
    )
}

export default HomePage;