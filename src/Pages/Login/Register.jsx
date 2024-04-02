import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth/useAuth";

const Register = () => {
  const { handleRegisterWithEmailAndPass, handleUpdate, handleSignGoolge } =
    useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const name = data.name;
    const password = data.password;
    const Photourl = data.photourl;
    const email = data.email;
    handleRegisterWithEmailAndPass(email, password)
      .then((result) => {
        // console.log(result.user);
        handleUpdate(name, Photourl)
          .then((result) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${result?.user.displayName} SuccessFully Register !!`,
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch();
        navigate("/dashboard");
      })
      .catch((error) => {
        // console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.message}  !!`,
          showConfirmButton: false,
          timer: 2000,
        });
      });
    // console.log(data);
  };
  const hangleGoogleSign = () => {
    handleSignGoolge()
      .then((result) => {
        // console.log(result.user);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${result?.user.displayName} SuccessFully Register !!`,
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/dashboard");
      })
      .catch((error) => {
        // console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.message}  !!`,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };
  return (
    <div className="md:flex justify-center items-center w-5/6 mx-auto my-10">
      <div className=" ">
        <img
          src="https://img.freepik.com/free-photo/portrait-handsome-redhead-male-with-bristle-glasses-t-shirt-pointing-upper-right-corner-smiling-joyfully_176420-27458.jpg?w=740&t=st=1711781665~exp=1711782265~hmac=fbf8824ca065450d83154852a1451f681cbcbe8b2dd235c14a96d1873360bb4d"
          alt=""
          className="w-[800px] rounded-full border-8 border-[#ffb300]"
        />
      </div>
      <div className=" p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            className="py-3 px-2 w-full  my-2 border  rounded-xl"
            required
            {...register("name")}
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="py-3 px-2 w-full border  my-2  rounded-xl"
            {...register("email")}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="py-3 px-2 w-full my-2 border  rounded-xl"
            {...register("password")}
          />

          <button
            type="submit"
            className="w-full border-[#ffb300] text-xl py-2 my-5 rounded-lg  bg-[#ffb300]   text-white hover:text-xl duration-700"
          >
            Register
          </button>
        </form>
        <h1>
          Already registered?
          <Link to="/">
            {" "}
            <span className="text-[#ffb300]">Go to log in</span>
          </Link>
        </h1>
        <div className="flex gap-5 justify-center my-5">
          <button onClick={hangleGoogleSign}>
            <FaGoogle className="text-2xl duration-300 hover:text-[#ffb300]" />
          </button>
          <button>
            <FaFacebook className="text-2xl duration-300 hover:text-[#ffb300]" />
          </button>
          <button>
            <FaGithub className="text-2xl duration-300 hover:text-[#ffb300]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
