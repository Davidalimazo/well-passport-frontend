interface SpinnerProp {
  imageUri: string | any;
}

function Spinner({ imageUri }: SpinnerProp) {
  return (
    <div className="animate-spin mt-24">
      <img src={imageUri} alt="loader image" width={70} height={70} />
    </div>
  );
}

export default Spinner;
