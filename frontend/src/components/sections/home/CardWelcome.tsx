import ActionCard from "./ActionCard";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
function CardWelcome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <ActionCard
      title={`Welcome ${user ? user.name : "Guest"}`}
      description="Ready to schedule your next session?"
      buttonText={!user ? "Sign in" : null}
      sizeClass="display-3"
      onAction={() => navigate("/login")}
    />
  );
}

export default CardWelcome;
