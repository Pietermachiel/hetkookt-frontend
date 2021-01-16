import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const About = () => {
  const markdown = `

  **hetkookt** is een digitaal kookboek met favoriete recepten, bewerkt en geredigeerd onder redactie van hetkookt, met links naar 's werelds 'beste' kookboeken'.

  Het is tevens een kookschrift om die recepten naar eigen inzicht aan te passen en om eigen of zelf gevonden recepten op te slaan.
  
  Met handige functies, zoals relaties tussen recepten, een weekmenu en boodschappenlijst, voorraadbeheer en vele zoekmogelijkheden.
  
  Kook met verse, lokale ingrediënten. Koop geen gemaksproducten maar maak alle sauzen en smaakmakers zelf. Bak je eigen brood.
  
  Maak je eigen [Kookschrift](/mijnrecepten)!

`;

  return (
    <Fragment>
      <div className="container-x unvisable slide work-grid-item">
        <p className="hetkookt-title text-red-600 font-700">About</p>

        <ReactMarkdown
          plugins={[gfm]}
          className="kramdown m-auto mb-36"
          children={markdown}
        />
      </div>
      <p className="kramdown m-auto mb-72 px-24 lg:px-0">
        Dit is een project van{" "}
        <a
          href="https://pieterroozen.nl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pieter Roozen
        </a>
      </p>
    </Fragment>
  );
};

export default About;
