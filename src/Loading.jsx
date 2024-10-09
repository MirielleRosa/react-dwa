const Loading = () => {
  return (
    <div className="position-fixed top-0 start-0 min-vw-100 min-vh-100 bg-dark bg-opacity-75 d-flex flex-column justify-content-center align-items-center z-3">
        <img src="../public/loading.svg" className="w-50" />
    </div>
  )
}

export default Loading;
