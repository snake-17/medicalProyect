import { Link } from "react-router-dom";
function EditProfileForm() {
  return (
    <form>
      <h3 className="card-title text-center mb-4">Edit Profile</h3>

      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">
          Name
        </label>
        <input
          type="name"
          className="form-control"
          id="exampleInputName"
          aria-describedby="nameHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword" className="form-label">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword"
          aria-describedby="PasswordHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputRePassword" className="form-label">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputRePassword"
          aria-describedby="PasswordHelp"
        />
      </div>

      <div className="d-flex justify-content-between mt-4">
        <Link to="/profile">Back</Link>

        <button type="submit" className="btn btn-primary">
          Confirm
        </button>
      </div>
    </form>
  );
}
export default EditProfileForm;
