import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://server-task-management.onrender.com",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
