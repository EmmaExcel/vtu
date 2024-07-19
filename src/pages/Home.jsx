import { Link } from 'react-router-dom';
import Navbar from '../components/home/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-neutral-100">
            <Navbar/>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500 text-xl">Content goes here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center">
                        <Link to="/login" className="text-blue-500 hover:underline mx-2">Login</Link>
                        <Link to="/signup" className="text-blue-500 hover:underline mx-2">Signup</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home;
