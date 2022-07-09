import Logo from "./Logo";

export default function Error() {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-2">
            <div className="mt-5 mb-10"><Logo /></div>
            <h1 className="font-bold text-2xl text-slate-900">Unexpected Error</h1>
            <h3 className="text-lg">Something went wrong, please try again later.</h3>
            <a href="/" className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">Return Home</a>
        </div>
    );
}