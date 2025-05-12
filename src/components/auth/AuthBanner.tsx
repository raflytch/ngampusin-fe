import { images } from "@/constants/images";

const AuthBanner = () => {
  return (
    <div className="hidden md:block md:w-1/2">
      <img
        src={images.authBanner}
        alt="Auth Banner"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default AuthBanner;
