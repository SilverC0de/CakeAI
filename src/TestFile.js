import React from "react";
import "./styles.css";

export default = () => {
  const [file, setFile] = React.useState();
  const uploadRef = React.useRef();
  const statusRef = React.useRef();
  const loadTotalRef = React.useRef();
  const progressRef = React.useRef();

  const UploadFile = () => {
    const file = uploadRef.current.files[0];
    setFile(URL.createObjectURL(file));
    var formData = new FormData();
    formData.append("image", file);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", ProgressHandler, false);
    xhr.addEventListener("load", SuccessHandler, false);
    xhr.addEventListener("error", ErrorHandler, false);
    xhr.addEventListener("abort", AbortHandler, false);
    xhr.open("POST", "fileupload.php");
    xhr.send(formData);
  };

  const ProgressHandler = (e) => {
    loadTotalRef.current.innerHTML = `uploaded ${e.loaded} bytes of ${e.total}`;
    var percent = (e.loaded / e.total) * 100;
    progressRef.current.value = Math.round(percent);
    statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";
  };

  const SuccessHandler = (e) => {
    statusRef.current.innerHTML = e.target.responseText;
    progressRef.current.value = 0;
  };
  const ErrorHandler = () => {
    statusRef.current.innerHTML = "upload failed!!";
  };
  const AbortHandler = () => {
    statusRef.current.innerHTML = "upload aborted!!";
  };

  return (
    <div className="App">
      <input type="file" name="file" ref={uploadRef} onChange={UploadFile} />
      <label>
        File progress: <progress ref={progressRef} value="0" max="100" />
      </label>
      <p ref={statusRef}></p>
      <p ref={loadTotalRef}></p>
      <img src={file} alt="" style={{ width: "300px", height: "100px" }} />
    </div>
  );
};