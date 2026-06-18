type ActionCardProps = {
  title: string;
  description: string;
  buttonText: string | null;
  sizeClass: string;
  onAction?: () => void;
};

function ActionCard({
  title,
  description,
  buttonText,
  sizeClass,
  onAction,
}: ActionCardProps) {
  return (
    <div className="card shadow mt-5">
      <div className="card-body text-center">
        <h1 className={`${sizeClass} text-uppercase`}>{title}</h1>
        <p className="card-text">{description}</p>
        {buttonText && (
          <button className="btn btn-primary" onClick={onAction}>
            {buttonText}
          </button>
        )}
        <hr
          className="mx-auto"
          style={{ width: "50px", borderTop: "3px solid blue" }}
        />
      </div>
    </div>
  );
}

export default ActionCard;
