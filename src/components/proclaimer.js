import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Proclaimer = () => {
  const markdown = `

  **Deze webapplicatie 'HetKookt' is bedoeld om zelf gevonden kookrecepten op een georganiseerde manier op te slaan in een kookschrift en te bewaren voor eigen gebruik. HetKookt hanteert daarvoor een eigen manier van beschrijven waardoor recepten onderling gerelateerd kunnen worden en daardoor ook in verschillende samenstelling kunnen worden gebruikt.**

  Met de recepten die in het kookschrift staan, hetzij door recepten van HetKookt te kiezen, danwel door eigen recepten nieuw in te voeren, kan een weekmenu worden opgesteld. Van de ingredientenlijst zijn vers en voorraad van elkaar gescheiden. Staan de recepten eenmaal op het weekmenu dan worden de benodigde verse ingredienten automatisch op de boodschappenlijst gezet. Indien niet meer voorradig kunnen houdbare ingredienten daarna afzonderlijk worden toegevoegd.

  De recepten die 'HetKookt' biedt vinden hun oorsprong in bestaande kookboeken. De beschrijving is een parafrase van die recepten, zodanig dat een consequent en eenvormig systeem ontstaat ondanks de inhoudelijke en redactionele verschillen tussen die kookboeken onderling. Zowel de lijst met ingredienten als de beschrijving van de werkwijze zijn dus geen letterlijke weergave van die recepten. Voor de werkelijke inhoud wordt verwezen naar de respectievelijke kookboeken zelf, met een bronvermelding, een boekbeschrijving en met een link naar de uitgever. 
    
  Er wordt bij deze website geen mogelijkheid geboden om de inhoud van de recepten te delen op sociale media. De recepten zijn welliswaar openbaar, maar de opgeslagen recepten zijn strikt prive. Wel is het mogelijk om van geselecteerde recepten een boodschappenlijst te genereren en die vervolgens per email te verzenden.
  
  De beschijving van de recepten is zo bondig mogelijk, maar tegelijkertijd heel precies. Zo veel mogelijk worden alle hoeveelheden aangegeven in milliliter en gram van de schone ingredienten. Bij de boodschappenlijst dient met dit gegeven rekening gehouden te worden. 
  
  Wij hebben er alles aan gedaan om de informatie zo volledig en accuraat mogelijk samen te stellen. Kom je iets tegen dat niet correct is dan stellen we een reactie, correctie of aanvulling zeer op prijs.
`;

  return (
    <Fragment>
      <div className="container-x w-750">
        <p className="hetkookt-title text-red-600 font-700">Proclaimer</p>

        <ReactMarkdown
          plugins={[gfm]}
          className="kramdown"
          children={markdown}
        />
      </div>
    </Fragment>
  );
};

export default Proclaimer;
