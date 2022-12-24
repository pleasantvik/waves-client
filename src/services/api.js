import axios from "axios";

export const getProductsBySort = async (limit, sort) => {
  try {
    const data = await axios.get("api/products", {
      params: {
        limit,
        sort,
      },
    });

    console.log(data?.data);
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};
