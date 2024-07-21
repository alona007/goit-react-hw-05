import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  return (
    <>
      <Link to={backLinkRef.current}>Go back</Link>
      <h1>
        Sorry, this page was not found, click the &#34;Go back&#34; button
      </h1>
    </>
  );
}
