import { useNavigate } from "react-router-dom";
import ActionCard from "../sections/home/ActionCard";
function Reservation() {
  const navigate = useNavigate();
  return (
    <div className="container d-flex justify-content-center">
      <ActionCard
        title="Edit your appointment"
        description="s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        buttonText="Take an appointment"
        sizeClass="display-6"
        onAction={() => navigate("/editappointment")}
      />
      <ActionCard
        title="Create an appointment"
        description="s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        buttonText="settings"
        sizeClass="display-6"
        onAction={() => navigate("/availability")}
      />
    </div>
  );
}
export default Reservation;
