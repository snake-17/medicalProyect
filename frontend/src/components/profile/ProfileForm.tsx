type ProfileFormProps = {
  onEdit: () => void;
};
function ProfileForm({ onEdit }: ProfileFormProps) {
  return (
    <form>
      <h3 className="card-title text-center mb-4">Profile</h3>

      <div className="mb-3">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Email:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="staticEmail"
            value=" email@example.com"
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="staticName" className="col-sm-2 col-form-label">
          Name:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="staticName"
            value=" Aexi"
          />
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button type="button" className="btn btn-primary" onClick={onEdit}>
          Edit
        </button>
      </div>
    </form>
  );
}
export default ProfileForm;
