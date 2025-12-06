import ProfilePage from "@/components/page/profile/ProfilePage";
import { singleUserget } from "@/services/AuthService";
import { getAllCategory } from "@/services/categoryService";

const Profile = async () => {
  const res = await singleUserget();
  const categories = await getAllCategory();
  return (
    <div>
      <ProfilePage userData={res?.data} categories={categories?.data} />
    </div>
  );
};

export default Profile;
