import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <div className={`${currentUser ? "" : "hidden"} w-[100%] sticky top-0`}>
            <div className='w-[100%] h-[7vh] flex justify-between items-center text-white bg-slate-900 px-2'>
                <Link to={"/"}>
                    <h1 className='font-bold'>Flex</h1>

                </Link>
                <ul className=''>
                    {/* <Link to={"/"}>
                        <li>Home</li>
                    </Link>
                    <Link to={"/about"}>
                        <li>About</li>
                    </Link> */}
                    <Link to={"/profile"}>
                        {currentUser ? (
                            <div className=" hover:opacity-80 text-white border border-black flex gap-2 justify-center items-center bg-blue-300 px-3 py-1 m-1  rounded-3xl ">
                                <span>
                                    Profile
                                </span>
                                <img src={currentUser.profilePicture} alt="Profile" className="border-black border h-8 w-8 object-cover rounded-full" />

                            </div>
                        ) : (<li>Sign In</li>
                        )}
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Header