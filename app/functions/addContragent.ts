export const getDictionaryByIdentifyCode = async (
  token: string,
  sector: string,
  entCode: string,
  clientType: number
) => {
  try {
    const response = await fetch(
      `http://10.0.101.36:8066/client/getLikeEntCode?businessType=${
        sector == "Food" ? 1 : 2
      }&entCode=${entCode}&clientType=${clientType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "accept: text/plain",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getDictionaryByNameSurname = async (
  token: string,
  sector: string,
  name: string,
  clientType: number
) => {
  try {
    const response = await fetch(
      `http://10.0.101.36:8066/client/getByName?businessType=${
        sector == "Food" ? 1 : 2
      }&name=${name}&clientType=${clientType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "accept: text/plain",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
