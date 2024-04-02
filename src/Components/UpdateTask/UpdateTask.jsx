import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth/useAuth";
import { useNavigate, useParams } from "react-router-dom";
const UpdateTask = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [preTask, setPreTask] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const res = axiosPublic.get(`/task/${id}`).then((res) => {
      setPreTask(res.data);
    });
  }, [axiosPublic, id]);
  const onSubmit = async (data) => {
    // console.log("data", data, startDate);
    const newTask = {
      heading: data.heading,
      description: data.description,
      date: data.date,
      status: "incomplate",
      userEmail: user.email,
      update: "Update",
    };
    const res = await axiosPublic.put(`/tasks/${id}`, newTask);
    {
      if (res.data.modifiedCount === 1) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.heading} update Succssefuly`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/mytask");
      }
    }
  };

  return (
    <div className="bg-[#f8f8f8] w-5/6 rounded-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="my-5 p-10">
        <div className=" space-y-5">
          <input
            type="text"
            placeholder="Heading"
            defaultValue={preTask.heading}
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
          <input
            type="date"
            name=""
            id=""
            defaultValue={preTask.date}
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
              maxLength: 200,
            })}
            defaultValue={preTask.description}
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
              Minimum 200 Length is required for description
            </p>
          )}
          {errors.description?.type === "maxLength" && (
            <p role="alert" className="text-yellow-500">
              maxLength 200 word for description
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full border-[#ffb300] text-xl py-2 my-5 rounded-lg  bg-[#ffb300] text-white  "
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
