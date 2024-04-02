/* eslint-disable react/prop-types */
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import useAuth from "../../Hooks/useAuth/useAuth";
import useTasks from "../../Hooks/useTasks/useTasks";
import Swal from "sweetalert2";

const Card = ({ task }) => {
  const { user } = useAuth();
  const [, refetch] = useTasks();
  const axiosPublic = useAxiosPublic();
  const handleUpdate = async (task) => {
    const statusUpdates = {
      heading: task.heading,
      description: task.description,
      date: task.date,
      userEmail: user.email,
      status: "Complete",
      update: "Update",
    };
    const res = await axiosPublic.put(`/tasks/${task._id}`, statusUpdates);
    refetch();
  };

  const handleDelete = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be this  task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/tasks/${item._id}`, {
          withCredentials: true,
        });
        console.log(res.data);
        refetch();
        if (res.data.deletedCount === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.heading} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div className="   h-96 flex items-center justify-center bg-[#323232] text-white p-4 rounded-2xl">
      {task.status === "Complete" ? (
        <>
          <div>
            <div>
              <h1 className="text-xl uppercase my-3  text-[#f3f3f3] font-bold">
                {task.heading}
              </h1>
              <p className="h-40 flex items-center">{task.description}</p>
              <p className="my-5 text-white">
                {task.date}
                {task.update === "Update" && (
                  <>
                    <div className=" ml-5 badge badge-secondary">
                      {task.update}
                    </div>
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center  justify-between my-5">
              <div>
                <p className="bg-primary  rounded-2xl px-5 py-2 ">
                  {task.status}
                </p>
              </div>
              <div className="flex justify-between gap-4 text-[#ffb300] ">
                <Link to={`/dashboard/updatetask/${task._id}`}>
                  <button className="btn btn-primary">
                    <FaEdit></FaEdit>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(task)}
                  className="btn btn-primary"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div>
              <h1 className="text-xl uppercase my-3 text-[#ffb300]">
                {task.heading}
              </h1>
              <p className="h-40 flex items-center">{task.description}</p>
              <p className="my-5 text-[#ffb300]">
                {task.date}
                {task.update === "Update" && (
                  <>
                    <div className=" ml-5 badge badge-secondary">
                      {task.update}
                    </div>
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center  justify-between my-5">
              <div>
                <button
                  onClick={() => handleUpdate(task)}
                  className="btn btn-warning  rounded-2xl"
                >
                  {task.status}
                </button>
              </div>
              <div className="flex justify-between gap-4 text-[#ffb300] ">
                <Link to={`/dashboard/updatetask/${task._id}`}>
                  <button className="btn">
                    <FaEdit></FaEdit>
                  </button>
                </Link>
                <button onClick={() => handleDelete(task)} className="btn">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
