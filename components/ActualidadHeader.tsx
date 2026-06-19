"use client";

import React, { useState } from "react";
import Header from "./Header";
import ContactoModal from "./ContactoModal";

export default function ActualidadHeader() {
  const [isContactoOpen, setIsContactoOpen] = useState(false);

  return (
    <>
      <Header onOpenContacto={() => setIsContactoOpen(true)} forceSolid={true} />
      <ContactoModal isOpen={isContactoOpen} onClose={() => setIsContactoOpen(false)} />
    </>
  );
}
