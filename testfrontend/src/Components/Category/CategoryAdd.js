import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner"
// import{Redirect} from "react-router-dom"

function CategoryAdd() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    errormessage: "",
    error: false,
    loading: false,
    redirect: false
  });
  

  const { name, error, errormessage} = data;

  const handleChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

//   const handleImageChange = name => (e) => {
//     console.log(e.target.files[0]);

//     setImageData(e.target.files[0])
//   };

//     const handleImageSubmit = (e) => {
//     e.preventDefault()

//     let imageFormData = new FormData()
//     imageFormData.append('productImg', imageData)

//     if (imageData.size > 1024 * 1024 * 5) {
//       setData({ error: true, errormessage: "File should be less than 5mb" });

//     } else if (imageData.type === "image/jpeg" || imageData.type === "image/jpg" || imageData.type === "image/png" || imageData.type === "image/svg")

//       axios({
//         url: `${process.env.REACT_APP_API_URL}/api/product/image`,
//         method: "post",

//         data: imageFormData
//       }).then(response => {
//         console.log(response);
//         setData({ photo: response.data.data.url })

//       }).catch(error => {
//         console.log(error.response);
//       })
//     else {
//       setData({ error: true, errormessage: "only jpg,jpeg,svg,png files allowed" });
//     }

//   }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ loading: true });
    if (!name ) {
      setData({ error: true, errormessage: "Please enter name.." });
    } else {
      await axios({
        url: `${process.env.REACT_APP_API_URL}/api/category/create`,
        method: "post",

        data: data,
      })
        .then((res) => {
          console.log(res);
          if (window !== undefined) {
            window.localStorage.setItem("jwt", JSON.stringify(res.data));
          }
          setData({ loading: false, error: false, redirect: true });
        })
        .catch((error) => {
          setData({
            loading: false,
            error: true,
            errormessage: error.response.data.err,
          });
        });
    }
  };

  // console.log(err);

  return (
    <div className="container-fluid p-5 w-75 mt-5">
      {loading ? (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <React.Fragment>
          <div className="text-center mb-5">
            <h1>CategoryAdd</h1>
          </div>
          {error ? (
            <div class="alert alert-danger" role="alert">
              {errormessage}
            </div>
          ) : (
            ""
          )}
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label for="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            {/* <div className="col-md-6">
              <label for="inputLastName" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLastName"
                value={description}
                onChange={handleChange("lastname")}
              />
            </div>
            <div className="col-12">
              <label for="inputEmail" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="inputEmail"
                value={price}
                onChange={handleChange("email")}
              />
            </div>
            <div className="col-12">
              <label for="inputPassword" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword"
                value={category}
                onChange={handleChange("password")}
              />
            </div>

            <div className="col-6">
              <label for="inputPassword" className="form-label">
                photo
              </label>
              <input
                type="file"
                className="form-control"
                id="inputPassword"

                //   value={category}
                onChange={handleImageChange("photo")}
              />
            </div>
            <div className="col-6 ">
              <button onClick={handleImageSubmit} className="btn btn-primary">
                upload
              </button>
            </div> */}

            <div className="col-12 ">
              <button type="submit" className="btn btn-primary">
                createCategory
              </button>
            </div>
          </form>
        </React.Fragment>
      )}
    </div>
  );

}export default CategoryAdd;
