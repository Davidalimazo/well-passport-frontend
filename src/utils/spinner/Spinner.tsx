interface SpinnerProp {
  imageUri: string | any;
}

function Spinner({ imageUri }: SpinnerProp) {
  return (
    <div className="animate-spin absolute bottom-20">
      <img src={imageUri} alt="loader image" width={70} height={70} />
    </div>
  );
}

export default Spinner;
