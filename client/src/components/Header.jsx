import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <div className={`${currentUser ? "" : "hidden"}`}>
            <div className='w-[100%] flex justify-between items-center p-2'>
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
                            <div className=" hover:opacity-80 text-white border border-black flex gap-2 justify-center items-center bg-blue-300 px-3 py-2  rounded-3xl ">
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