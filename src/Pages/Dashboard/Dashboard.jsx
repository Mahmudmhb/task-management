import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { IoIosMenu } from "react-icons/io";
import useAuth from "../../Hooks/useAuth/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="md:p-10 bg-black">
      <div className="md:flex md:flex-row flex-col  gap-y-3">
        <div className="flex   md:justify-between justify-around   md:bg-none lg:bg-none  sticky top-0 pt-5 md:pt-0  border-b md:border-none mb-5 ">
          <div className=" ">
            <div className="drawer z-[100] md:hidden lg:hidden">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="  drawer-button">
                  <IoIosMenu className="text-3xl text-white" />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu  w-80 min-h-full bg-base-200 text-base-content">
                  {/* Sidebar content here */}
                  <li>
                    <Sidebar></Sidebar>
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden md:flex lg:flex">
              <Sidebar></Sidebar>
            </div>
          </div>
          <div className="flex md:hidden  lg:hidden">
            <h1 className=" text-[#ffb300] text-2xl mb-5 font-bold">
              {user?.displayName}{" "}
            </h1>
          </div>
        </div>
        <div className="w-full py-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
