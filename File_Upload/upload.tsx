const onSubmit = values => {
    const { userfile } = values;
    const data = new FormData();
    data.append("file", userfile[0]);
    fetch("/api/upload", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
};