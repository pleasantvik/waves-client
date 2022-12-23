import axios from "axios";

export const getProductsBySort = async () => {
  try {
    const data = await axios.get("api/products", {
      params: {
        limit: 4,
        sort: "price",
      },
    });

    console.log(data?.data);
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};
