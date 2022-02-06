import Orders from '../components/Orders';
import ProfileForm from '../components/ProfileForm';

const ProfilePage = () => {
  return (
    <div className="flex flex-col xl:flex-row mt-16">
      <ProfileForm />
      <Orders />
    </div>
  );
};

export default ProfilePage;
