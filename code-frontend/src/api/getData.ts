import axios from "axios";
export const getData = async (): Promise<any> => {
  return await axios
    .get(`http://localhost:8001/data`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return { message: "error" };
    });
};
