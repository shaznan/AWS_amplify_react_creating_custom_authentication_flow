import React, { useEffect } from "react";
import axios from "axios";
const Fetch = () => {
  const fetchData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Fetch</div>;
};

export default Fetch;
