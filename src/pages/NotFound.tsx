import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50">
            <h1 className="text-5xl font-bold text-red-500 mb-2">404</h1>
            <p className="text-lg text-gray-700 mb-4">Oops! The page you're looking for cannot be found.</p>
            <p className="text-md text-gray-600 mb-6">
                It might have been moved, deleted, or never existed.
            </p>
            <Link to="/" className="text-blue-600 underline hover:text-blue-800 transition duration-300 ease-in-out">
                Go back to dashboard
            </Link>
            <div className="mt-8 text-sm text-gray-500">
                <p>If you think this is an error, please contact support.</p>
                <p>Email: <span className="text-blue-600">support@dkart.com</span></p>
            </div>
        </div>
    );
};

export default NotFound;
