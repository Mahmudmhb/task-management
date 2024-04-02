import useTasks from "../../../Hooks/useTasks/useTasks";

const TaskDashboard = () => {
  const [tasks] = useTasks();
  return (
    <div className="text-white">
      <div className="   h-96 bg-[#323232] text-white flex items-center justify-center p-5 rounded-2xl">
        <div className="flex items-center  justify-center">
          <div className="text-center text-5xl">
            <h1>Total Tasks</h1>
            <p className="text-[#ffb300] mt-5">{tasks.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
