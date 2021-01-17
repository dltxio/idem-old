import axios from "axios";

const register = async (vendor) => {
  const endpoint = "https://testapi.getpaidinbitcoin.com.au/user";
  const data = JSON.stringify({
    firstName: "Test",
    secondName: "User",
    email: "lucas4@lucascullen.com",
    password: "Test1234!",
  });

  const config = {
    method: "post",
    url: "https://testapi.getpaidinbitcoin.com.au/user",
    headers: {
      "Content-Type": "application/json",
    }
  };

  const response = await axios.post(endpoint, data, config);
  if (response.data == null)
    throw new Error(`Could not post data to endpoint "${endpoint}"`);

  console.log(response.data);
  return response.data;
};

export default register;
