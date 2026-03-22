import { useEffect, useReducer } from "react";
import "./styles.scss";
import SelectImage from "./SelectImage";
import Preview from "./Preview";
import Caption from "./Caption";
import { createPost } from "../../services/firebase";

function CreatePost({ toggleModal, userName, userId }) {
  const initialaState = {
    previewUrl: null,
    caption: "",
    stepNumber: 0,
    showSubmit: false,
    filename: "",
    file: null,
  };

  const reducer = (state, newState) => ({ ...state, ...newState });

  const [
    { previewUrl, caption, stepNumber, showSubmit, filename, file },
    dispatch,
  ] = useReducer(reducer, initialaState);

  const steps = ["Create Post", "Preview", "Caption"];

  const multiStepForm = () => {
    if (stepNumber === 0)
      return <SelectImage updateStep={dispatch} stepNumber={stepNumber} />;

    if (stepNumber === 1) return <Preview previewUrl={previewUrl} />;

    if (stepNumber === 2)
      return (
        <Caption
          updateStep={dispatch}
          previewUrl={previewUrl}
          userName={userName}
          caption={caption}
        />
      );
  };

  async function handleSubmit() {
    await createPost(caption, file, userId, filename).catch((err) => {
      console.error(err);
    });

    //closing modal after sumbission, no error handling
    toggleModal();
  }

  return (
    <div className="create-post-modal">
      <div
        className="close-modal"
        onClick={() => {
          toggleModal();
        }}
      ></div>
      <div className="create-post-wrapper">
        <div className="header">
          <div className="back">
            {stepNumber >= 1 && (
              <button
                disabled={stepNumber === 0}
                onClick={() => {
                  dispatch({ stepNumber: stepNumber - 1, showSubmit: false });
                }}
              >
                Back
              </button>
            )}
          </div>
          {steps[stepNumber]}
          <div className="next">
            {stepNumber === 1 && (
              <button
                disabled={stepNumber === steps.length - 1}
                onClick={() => {
                  dispatch({ stepNumber: stepNumber + 1 });
                }}
              >
                Next
              </button>
            )}

            {showSubmit && (
              <button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
        <div className="body">{multiStepForm()}</div>
      </div>
    </div>
  );
}

export default CreatePost;
