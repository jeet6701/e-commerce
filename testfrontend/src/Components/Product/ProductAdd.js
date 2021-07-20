import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner"
// import{Redirect} from "react-router-dom"

function ProductAdd() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    photo: "",
    errormessage: "",
    error: false,
    loading: false,
    redirect: false
  });
  const [imageData, setImageData] = useState()

  const { name, description, price, category, stock, error, errormessage, photo } = data;

  const handleChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const handleImageChange = name => (e) => {
    console.log(e.target.files[0]);

    setImageData(e.target.files[0])
  };

    const handleImageSubmit = (e) => {
    e.preventDefault()

    let imageFormData = new FormData()
    imageFormData.append('productImg', imageData)

    if (ImageData.size > 1024*1024*5) {
      setData({ error: true, errormessage: "File should be less than 5mb" });

    } else if (ImageData.type === "image/jpeg" || ImageData.type === "image/jpg" || ImageData.type === "image/png" || ImageData.type === "image/svg")

      axios({
        url: `${process.env.REACT_APP_API_URL}/api/product/image`,
        method: "post",

        data: imageFormData
      }).then(response => {
        console.log(response);
        setData({ photo: response.data.data.url })

      }).catch(error => {
        console.log(error.response);
      })
    else {
      setData({ error: true, errormessage: "only jpg,jpeg,svg,png files allowed" });
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ loading: true });
    if (!name || !description || !price || !category || !stock || !photo) {
      setData({ error: true, errormessage: "Please enter all details..." });
    } else {
      await axios({
        url: `${process.env.REACT_APP_API_URL}/api/product/create`,
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
            <h1>ProductAdd</h1>
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
                type="name"
                className="form-control"
                id="inputName"  
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="col-12">
              <label for="inputdescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="inputdescription"
                value={description}
                onChange={handleChange("description")}
              />
            </div>
            <div className="col-md-6">
              <label for="inputprice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="inputprice"
                value={price}
                onChange={handleChange("price")}
              />
            </div>
            <div className="col-md-6">
              <label for="inputcategory" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="inputcategory"
                value={category}
                onChange={handleChange("category")}
              />
            </div>
            <div className="col-12">
              <label for="inputstock" className="form-label">
                Stock
              </label>
              <input
                type="number"
                className="form-control"
                id="inputstock"
                value={stock}
                onChange={handleChange("stock")}
              />
            </div>

            <div className="col-6">
              <label for="inputphoto" className="form-label">
                Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="inputphoto"

                //   value={category}
                onChange={handleImageChange("photo")}
              />
            </div>
            <div className="col-6 mt-5 mb-8">
              
              <button onClick={handleImageSubmit} className="btn btn-secondary btn-sm btn-center">
              {/* <button type="submit">Add</button> */}
                {/* btn-6 className="btn btn-primary btn-sm mt-5 mb-auto"> */}
              {/* <div style="height:0px;overflow:hidden">
   <input type="file" id="fileInput" name="fileInput" />
</div> */}

              {/* text-align: center; */}
              {/* <span>Choose File</span>
        <input name="Select File" type="file" /> */}
                upload
              </button>
              {/* <input
                type="submit"
                className="app"
                id="inputphoto"

                //   value={category}
                onClick={handleImageChange}
              /> */}
            </div>

            <div className="col-12 ">
              <button type="submit" className="btn btn-primary">
                createProduct
              </button>
            </div>
          </form>
        </React.Fragment>
      )}
      
    </div>
  );

}    
export default ProductAdd;