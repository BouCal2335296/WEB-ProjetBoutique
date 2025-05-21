import Image from "next/image";
import styles from "./Style/page.module.css";
import Accueil from "./Composant/Accueil/Accueil";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


export default function HomePage() {
  return (
    <>
      <Accueil/>
    </>
  );
}