import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div id="error" className="w-full h-[100vh] flex flex-col justify-center items-center p-4">
      <div>
        <span className="text-[140px]">4</span><span className="text-[180px]">0</span><span className="text-[140px]">4</span>
      </div>
      <div className="text-md font-light">Oops! Our Developer decided to watch memes instead of building this page.</div>
      <NavLink to="/">
        <div className="text-sm pt-2 border-b-2 border-black cursor-pointer hover:border-[#F2F2F2]">Fly Back to Home</div>
      </NavLink>
    </div>

  )
}

export default Error
