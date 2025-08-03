import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

type BrandNavLinkProps = {
  to: string;
  children: React.ReactNode;
};

export function BrandNavLink({ to, children }: BrandNavLinkProps) {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
}
