import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth/useAuth";
import { FaSignOutAlt, FaTasks } from "react-icons/fa";
import { MdDashboard, MdOutlineAddTask } from "react-icons/md";

const Sidebar = () => {
  const { user, handleLogOut } = useAuth();
  const handleSignOut = () => {
    handleLogOut().then().catch();
  };
  return (
    <div className="md:w-60 w-80  md:bg-base-200  flex-col justify-between  text-center h-screen  flex md:rounded-2xl  text-xl md:mx-5">
      <div>
        <h1 className="py-5 text-[#ffb300] text-xl  font-bold">
          {user?.displayName}{" "}
        </h1>
        <div className="flex flex-col  justify-between">
          <ul className="menu text-xl">
            <li className="w-full">
              <NavLink to="/dashboard/taskdashboard">
                <MdDashboard /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/mytask">
                {" "}
                <FaTasks /> My Task
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/dashboard/taskcomplete"> Task Complate </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/taskreview"> Task Review </NavLink>
            </li> */}
            <li>
              <NavLink to="/dashboard/addtask">
                {" "}
                <MdOutlineAddTask /> Add Task{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-20 p-5">
        <button onClick={handleSignOut} className="flex items-center gap-3">
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
