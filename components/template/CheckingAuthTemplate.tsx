import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelect } from "../../hooks/ReduxHooks";
import { checkAccessAuthorization } from "../../lib/api/AppFetchPost";

interface AppLayoutProps {
  children: React.ReactNode;
}

const CheckingAuthTemplate = ({ children }: AppLayoutProps) => {
  const router = useRouter();
  const accessToken = useAppSelect((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      checkAccessAuthorization(accessToken)
        .then(() => {
          console.log("You can access");
        })
        .catch(() => {
          alert("접근 권한이 없습니다");
          router.push("/");
        });
    }
  }, [accessToken, router]);

  return <>{children}</>;
};

export default CheckingAuthTemplate;
