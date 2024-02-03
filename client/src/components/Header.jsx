import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <div className={`${currentUser ? "" : "hidden"} w-[100%] sticky top-0`}>
            <div className='w-[100%] h-[7vh] flex justify-between items-center text-white bg-[#000000e7] border-b-2 border-[#ffffffa7] px-2'>
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

                                <img src={currentUser.profilePicture} alt="Profile" className="border-black border w-10 object-cover h-10 rounded-full" />
                        ) : (<li>Sign In</li>
                        )}
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Header