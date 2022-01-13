import Orders from '../components/Orders';
import ProfileForm from '../components/ProfileForm';

const ProfilePage = () => {
  return (
    <div className="flex">
      <ProfileForm />
      <Orders />
    </div>
  );
};

export default ProfilePage;
