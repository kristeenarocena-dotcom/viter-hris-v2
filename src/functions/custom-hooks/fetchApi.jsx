const fetchApi = (url, fd = {}, dispatch = null) => {
  const data = fetch(url, {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(fd),
  })
    .then((res) => {
      return res.json();
    })

    .catch((error) => {
      console.log(error);
      // return error;
      return false;
      // dispatch(setError(true));
      // dispatch(setMessage("API / Network Error"));
    });
  return data;
};

export default fetchApi;
