function NextButton({ dispatch, answer }) {
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    </div>
  );
}

export default NextButton;
