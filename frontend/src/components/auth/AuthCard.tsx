import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

function AuthCard(props: AuthCardProps) {
  const { children } = props;
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "350px" }}>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}

export default AuthCard;
