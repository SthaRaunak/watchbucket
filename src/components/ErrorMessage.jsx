function ErrorMessage({ errorMessage }) {
  return (
    <div className="max-w-[1200px] mx-auto text-center pt-[250px] text-3xl text-stone-400 ">
      {errorMessage}
    </div>
  )
}

export default ErrorMessage;
