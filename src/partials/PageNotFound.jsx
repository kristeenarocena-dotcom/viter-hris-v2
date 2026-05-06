import { TbWorldOff } from "react-icons/tb";
import { Link } from "react-router-dom";
import { devNavUrl } from "../helpers/functions-general";

const PageNotFound = () => {
  const currentRole = location.pathname.split("/")[1];
  console.log(currentRole);

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-2 h-[70dvh] p-5">
        <span className="text-8xl">
          <TbWorldOff />
        </span>
        <h3 className="text-6xl">404</h3>
        <h2 className="font-bold text-2xl">Page not found</h2>
        <p className="text-sm m-0">
          You don't have access to this page or you enter the wrong path.
        </p>
        <p>Please check your URL</p>
        <Link to={`${devNavUrl}/`} className="underline text-primary">
          Home
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
