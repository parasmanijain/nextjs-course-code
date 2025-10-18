import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AuthForm } from "@/components/auth/AuthForm";

function AuthPage() {
  const [isLoading,setIsLoading] = useState(true);
  const router = useRouter();
  const getSessionData = async () => {
    const session = await getSession();
    if (session) {
      router.replace('/')
    } else {
setIsLoading(false)
    }
  };

  useEffect(() => {
    getSessionData();
  }, [router]);

  if(isLoading) {
    return <p>Loading...</p>
  }
  return <AuthForm />;
}

export default AuthPage;
