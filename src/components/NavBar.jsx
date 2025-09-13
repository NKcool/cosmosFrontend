import { useNavigate } from 'react-router-dom';
import StarButton from "@/components/StarButton";
import GlowCard from "@/components/GlowCard";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, redirecting)
    console.log("Logging out...");
    localStorage.setItem("auth_token", "");
    navigate("/auth"); // Redirect to login page

  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <GlowCard className="flex justify-between items-center p-4 shadow-md bg-black/30 backdrop-blur-md rounded-lg myNav">
      <div className="text-white text-lg font-semibold"></div>
      <div className="flex gap-4">
        <StarButton onClick={handleBack}>Back</StarButton>
        <StarButton onClick={handleLogout}>Logout</StarButton>
      </div>
    </GlowCard>
  );
};

export default Navbar;
