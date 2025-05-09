import authBanner from "@/assets/image/auth-banner.jpg";

const AuthBanner = () => {
  return (
    <div className="hidden md:block md:w-1/2">
      <img
        src={authBanner}
        alt="Auth Banner"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default AuthBanner;
