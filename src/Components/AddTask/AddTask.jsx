import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth/useAuth";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log("data", data, startDate);

    const newTask = {
      heading: data.heading,
      description: data.description,
      date: data.date,
      status: "incomplete",
      userEmail: user.email,
    };
    console.log(newTask);
    const res = await axiosPublic.post("/tasks", newTask);
    console.log(res.data);
    if (res.data.acknowledged) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.heading} Add Succssefuly`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/mytask");
    }
  };

  return (
    <div className="bg-[#f8f8f8] w-5/6 rounded-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="my-5 p-10">
        <div className=" space-y-5">
          <input
            type="text"
            placeholder="Heading"
            {...register("heading", {
              required: true,
              minLength: 20,
              maxLength: 50,
            })}
            aria-invalid={errors.heading ? "true" : "false"}
            className="py-2 px-2 w-full  border border-[#ffb300] rounded-lg"
          />
          {errors.heading?.type === "required" && (
            <p role="alert" className="text-yellow-500">
              Heading name is required
            </p>
          )}
          {errors.heading?.type === "minLength" && (
            <p role="alert" className="text-yellow-500">
              Minimum Length 20 Word for Heading
            </p>
          )}
          {errors.heading?.type === "maxLength" && (
            <p role="alert" className="text-yellow-500">
              Maximum Length is 50 Word
            </p>
          )}
        </div>
        <div className="text-yellow-500  ">
          {/* <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          /> */}
          <input
            type="date"
            name=""
            id=""
            {...register("date", { required: true })}
            required
            className="border  border-[#ffb300] mt-5"
          />
        </div>
        <div className=" my-5 ">
          <textarea
            name=""
            {...register("description", {
              required: true,
              minLength: 50,
              maxLength: 250,
            })}
            aria-invalid={errors.description ? "true" : "false"}
            className="textarea border w-full p-2 border-[#ffb300] rounded-lg"
            placeholder="Description"
            id=""
            rows="4"
          ></textarea>
          {errors.description?.type === "required" && (
            <p role="alert" className="text-yellow-500">
              Description is required
            </p>
          )}
          {errors.description?.type === "minLength" && (
            <p role="alert" className="text-yellow-500">
              Minimum 50 Length is required for description
            </p>
          )}
          {errors.description?.type === "maxLength" && (
            <p role="alert" className="text-yellow-500">
              maximum Length 250 word for description
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full border-[#ffb300] text-xl py-2 my-5 rounded-lg  bg-[#ffb300] text-white  "
        >
          Add New Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
