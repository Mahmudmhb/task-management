import { FaPlus } from "react-icons/fa";
import Card from "./Card";
import { Link } from "react-router-dom";
import useTasks from "../../Hooks/useTasks/useTasks";
import { useState } from "react";

const Cards = () => {
  const [tasks] = useTasks();

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Calculate indexes for products to display
  const indexOfLastTasks = currentPage * tasksPerPage;
  const indexOfFirstTasks = indexOfLastTasks - tasksPerPage;
  const currentProducts = tasks.slice(indexOfFirstTasks, indexOfLastTasks);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col   items-center justify-center">
      <div className="grid  lg:grid-cols-3 gap-4 ">
        {currentProducts.map((task) => (
          <Card key={task._id} task={task}></Card>
        ))}

        <div className="   h-96 bg-[#323232] text-white flex items-center justify-center p-5 rounded-2xl">
          <div className="">
            <Link to="/dashboard/addtask">
              <button className="flex  gap-3">
                <FaPlus /> Add New Task
              </button>
            </Link>
          </div>
        </div>
      </div>

      {tasks.length > 5 && (
        <>
          <div className="join my-10">
            {Array.from({
              length: Math.ceil(tasks.length / tasksPerPage),
            }).map((_, index) => (
              <div
                key={index}
                className={
                  currentPage === index + 1
                    ? " btn btn-warning  text-white"
                    : ""
                }
              >
                <button
                  className="join-item btn btn-square"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;
