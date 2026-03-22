import React from "react";

function SelectImage({ updateStep, stepNumber }) {
  function handleFileUpload(e) {
    if (!e.target.files) return;
    console.log(e.target.files[0].name);
    const objectURl = URL.createObjectURL(e.target.files[0]);
    updateStep({
      previewUrl: objectURl,
      filename: e.target.files[0].name,
      file: e.target.files[0],
      stepNumber: stepNumber + 1,
    });

    return () => URL.revokeObjectURL(objectURl);
  }

  return (
    <div className="select-image">
      <label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <figure>
          <div className="button">Select From Computer</div>
        </figure>
      </label>
    </div>
  );
}

export default SelectImage;
