import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const About = () => {
  const markdown = `

**Met **HetKookt** kan je kookrecepten op een georganiseerde manier opslaan in een kookschrift en bewaren voor eigen gebruik, met handige functies, zoals relaties tussen recepten, een weekmenu en boodschappenlijst, voorraadbeheer en vele zoekmogelijkheden.**

## een ode aan kookboeken voor thuis koken

Er bestaat een lange traditie, teruggaand tot [La scienza in cucina e l'arte di mangiar bene](/books/la-scienza-in-cucina-e-l-arte-di-mangiar-bene) van Pellegrino Artusi in 1891 en wellicht nog veel verder terug, van vermaarde koks en culinaire specialisten die hun kennis en kunsten delen met de thuiskok. **HetKookt** heeft een aantal van hun recepten voor je geselecteerd om als voorbeeld te dienen. Ze zijn van de zogenaamde categorie ‘De Eerlijke Keuken’, met slow cooking, pure ingrediënten en alles thuis zelf maken. 

## de recepten

**HetKookt** is om te beginnen een leeg digitaal kookschrift dat gevuld kan worden. De recepten die **HetKookt** biedt vinden hun oorsprong in bestaande kookboeken. Ze zijn zodanig bewerkt dat je ze samen kunt gebruiken, ondanks de inhoudelijke en redactionele verschillen tussen die kookboeken onderling. Zowel de lijst met ingrediënten als de beschrijving van de werkwijze zijn dus geen letterlijke weergave van die recepten. Voor de werkelijke inhoud wordt verwezen naar de respectievelijke kookboeken zelf, met een bronvermelding, een boekbeschrijving en met een link naar de uitgever. Die daarmee de aandacht krijgt die het verdient. Een kookboek uitgeven is ook een kunst!

## de redactie

De beschijving van de recepten is zo bondig mogelijk, maar tegelijkertijd heel precies. Zo veel mogelijk worden alle hoeveelheden aangegeven in milliliter en gram van de schone ingrediënten. Bij de boodschappenlijst dient met dit gegeven rekening gehouden te worden.


## aanvullingen en suggesties

Suggesties voor nieuwe recepten/kookboeken graag mailen naar <studio@roozen.nl>:

- Een aanvulling, verbetering of wezenlijke variant.
- Een basisrecept of klassieker of andere/betere manier om met een ingrediënt te koken.
- Uit een bestaand kookboek van een gerenommeerde kok met bronvermelding. Ere wie ere toekomt!


  

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
    </Fragment>
  );
};

export default About;
