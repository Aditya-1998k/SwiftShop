import { Link, useNavigate } from "react-router-dom"


function Navbar(){
    const navigate = useNavigate()

    const handleClick =(path)=>{
        navigate(path)
    }
    return(
    <nav className="relative bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex shrink-0 items-center">
                    <img src="https://www.svgrepo.com/show/501826/shop.svg" alt="Your Company" className="h-8 w-auto" />
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                        <Link to="/" aria-current="page" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Dashboard</Link>
                        <Link to="/user" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Product</Link>
                        <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Order</a>
                        <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">Calendar</a>
                    </div>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center space-x-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Notification Button */}
                    <button type="button" className="h-9 w-9 rounded-full overflow-hidden bg-gray-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <img src="https://www.svgrepo.com/show/522427/notification-bell-on.svg" alt="Profile" className="h-full w-full object-cover"/>
                    </button>

                    {/* Profile Avatar */}
                    <button onClick={() => handleClick("/user")} type="button" className="h-9 w-9 rounded-full overflow-hidden bg-gray-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <img src="https://www.svgrepo.com/show/522440/profile.svg" alt="Profile" className="h-full w-full object-cover"/>
                    </button>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default Navbar