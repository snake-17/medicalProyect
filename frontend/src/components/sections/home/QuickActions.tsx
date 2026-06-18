import { useNavigate } from "react-router-dom";
import ActionCard from "./ActionCard";
import { useAuth } from "../../context/useAuth";

function QuickActions() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Función ayudante para validar el acceso
  const handleProtectedAction = (targetPath: string) => {
    if (user) {
      navigate(targetPath);
    } else {
      // Si no hay usuario, lo mandamos al login
      navigate("/login");
    }
  };

  return (
    <div className="container d-flex justify-content-center mb-5">
      <div className="d-flex justify-content-center gap-4">
        <ActionCard
          title={`Take an appointment ${user ? user.name : "guest"}`}
          description="Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          buttonText="Take an appointment"
          sizeClass="display-6"
          onAction={() => handleProtectedAction("/appointments")}
        />
        <ActionCard
          title={`Your account ${user ? user.name : "guest"}`}
          description="Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
          buttonText="Settings"
          sizeClass="display-6"
          onAction={() => handleProtectedAction("/profile")}
        />
      </div>
    </div>
  );
}

export default QuickActions;
