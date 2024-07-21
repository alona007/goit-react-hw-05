import { useState } from "react";

export default function useLoad() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return { loading, setLoading, error, setError };
}
