import salad from "../assets/salad.jpg";

const Modal = () => {
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my-modal-4" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative w-11/12 max-w-5xl" htmlFor="">
        <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="hero h-full bg-base-200 p-0">
            <div className="hero-content flex-col lg:flex-row">
              <div className="avatar min-w-min">
                <div className="w-72 lg:w-96 rounded">
                  <img src={salad} />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default Modal;
