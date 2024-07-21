import { Link } from "react-router-dom";

function NotFound() {
  return (
    <p className="mt-[60px] text-center text-2xl">
      Your request didn`t find! <br /> Go to{" "}
      <Link to="/" className="underline underline-offset-4">
        home
      </Link>{" "}
      page and try again
    </p>
  );
}

export default NotFound;
