import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleLogin, handleSignGoolge } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    const password = data.password;
    const email = data.email;
    handleLogin(email, password)
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${result.user.displayName} SuccessFully Login !!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: `${error.message}  !!`,
          showConfirmButton: false,
          timer: 2000,
        });
      });
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

        navigate("/dashboard/taskdashboard");
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
    <div className="md:flex md:justify-center md:items-center w-5/6 mx-auto my-20">
      <div className=" p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            className="py-3 px-2 w-full border  my-2  rounded-xl"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <p role="alert"> Please Provide your valid Email for Login</p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="py-3 px-2 w-full my-2 border rounded-xl"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
              minLength: 8,
              maxLength: 16,
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password?.type === "pattern" && (
            <p role="alert">
              {" "}
              {errors.password?.message}
              one uppercase, one number, minimum length 8 to 16 characters.
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p role="alert">
              {" "}
              {errors.password?.message}
              minimum length 8 characters.
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p role="alert">
              {" "}
              {errors.password?.message}
              maximum length 16 characters.
            </p>
          )}

          <button
            type="submit"
            className="w-full border-[#ffb300] text-xl py-2 my-5 rounded-lg  bg-[#ffb300]   text-white hover:text-xl duration-700"
          >
            Login
          </button>
        </form>
        <h1>
          NEW HERE?
          <Link to="/register">
            <span className="text-[#ffb300]">CREATE A NEW ACCOUNT</span>
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
      <div className=" ">
        <img
          src="https://img.freepik.com/free-photo/portrait-flirty-funny-european-male-model-with-moustache-beard-striped-shirt-pointing-left-with-finger-gun-gestures-smiling-broadly-inving-cute-woman-continue-talking-bar_176420-22462.jpg?w=740&t=st=1711781695~exp=1711782295~hmac=bf1ddc2cecc81a3b1e46075acbae16f3cd9a76105fdbc152f4cd1daffa795b24"
          alt=""
          className="w-[600px] rounded-full border-8 border-[#ffb300]"
        />
      </div>
    </div>
  );
};

export default Login;
