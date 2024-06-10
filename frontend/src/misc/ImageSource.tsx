import { useEffect, useState } from "react";
import { Companies, Contacts } from "../generated/client";

export default function useImageSource(record: Companies | Contacts): string {
  const [logoSrc, setLogoSrc] = useState<string>("");
  useEffect(() => {
    const val =
      "avatar" in record && record.avatar
        ? (record.avatar as { src: string }).src
        : "logo" in record && record.logo
        ? (record.logo as { src: string }).src
        : "";
    setLogoSrc(val || "");
  }, [record]);

  return logoSrc;
}
