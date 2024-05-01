import React, { useRef, useState } from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button';
import * as ml5 from 'ml5';
import { Loader } from '../loader/Loader';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
  const inputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreviewImage(null);
    }
  };

  // When the model is loaded
const modelLoaded = () => {
  console.log('Local Model Loaded!');
}

  const handleDetection = async () => {
    if (selectedImage) {
      setLoading(true);

      const classifier = await ml5.imageClassifier("model.json", modelLoaded);
      const image = document.createElement('img');
      image.src = URL.createObjectURL(selectedImage);
      image.onload = async () => {

      const results = await classifier.classify(image);
      const data = results[0].label;
      setData(data);
      
      if(data != null){
        navigate("/results", {replace:true, state:{data}})
      } else {
        navigate("/", {replace:true})
      }
      

      setLoading(false);

        console.log(results[0].label); // You can use the classification results as needed
      };
    } else {

      toast.error('Please select an x-ray image first!!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

      //console.log('Please select an image.');
    }
  };

  return (
    <div className="container">

    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {loading ? (
        <Loader /> // Show the loader while loading is true
      ) : (
        <div className="content">
          <div className="image_container">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="preview_image" />
            ) : (
              'Select an x-ray image'
            )}
          </div>

          <form>
            <div className="d-grid gap-2">
              <input
                ref={inputRef}
                id="input-file"
                className="d-none"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button variant="outline-primary" className="custom_button" onClick={handleSelect}>
                Select Image
              </Button>
              <Button variant="outline-success" className="custom_button" onClick={handleDetection}>
                Detect Tuberculosis
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
