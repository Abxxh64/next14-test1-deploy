import axios from "axios";

const baseApi = axios.create({
    baseURL: "http://ec2-34-206-72-0.compute-1.amazonaws.com:8081"

})

export default baseApi