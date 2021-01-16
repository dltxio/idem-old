import { Linking } from "react-native";

const register = async (vendor) => {
  const endpoint = "https://testapi.getpaidinbitcoin.com.au/user";
  const data = JSON.stringify({
    firstName: "Test",
    secondName: "User",
    email: "lucas3@lucascullen.com",
    password: "Test1234!",
  });

  const config = {
    method: "post",
    url: "https://testapi.getpaidinbitcoin.com.au/user",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios.post(endpoint, data);
  if (response.data == null)
    throw new Error(`Could not post data to endpoint "${endpoint}"`);
  return response.data;
};

export default register;
