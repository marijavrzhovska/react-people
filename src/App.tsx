import { NavLink, Outlet } from "react-router-dom";
import Messages from "./Components/Messages";

export default function App() {
  return (
    <>
    <h1 className="text-4xl text-s;ate-700 font-bold text-center">People</h1>
    <nav className="bg-slate-200 p-1 mt-2">
      <ul className="flex justify-center gap-4 my-3 text-2xl 
      font-semibold uppercase">
        <li>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='/persons' end>People</NavLink>
        </li>
      </ul>
    </nav>

    <div className="mt-5 container mx-auto flex justify-between gap-6">
      <div className="flex-1">
        <Outlet/>
      </div>
      <div className="flex-1">
        <Messages/>
      </div>
    </div>
    </>
    
  )
}