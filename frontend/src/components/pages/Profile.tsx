import { useNavigate } from "react-router-dom";
import ProfileCard from "../profile/ProfileCard";
import ProfileForm from "../profile/ProfileForm";

function Profile() {
  const navigate = useNavigate();
  return (
    <ProfileCard>
      <ProfileForm onEdit={() => navigate("/editProfile")} />
    </ProfileCard>
  );
}

export default Profile;
