import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const About = () => {
  const markdown = `

Met **hetkookt** kan je kookrecepten op een georganiseerde manier opslaan in een persoonlijk kookschrift en bewaren voor eigen gebruik, met handige functies, zoals relaties tussen recepten, een weekmenu en boodschappenlijst, voorraadbeheer en vele zoekmogelijkheden.

## een ode aan kookboeken voor thuis koken

Er bestaat een lange traditie, teruggaand tot [La scienza in cucina e l'arte di mangiar bene](/books/la-scienza-in-cucina-e-l-arte-di-mangiar-bene) van Pellegrino Artusi in 1891 en wellicht nog veel verder terug, van vermaarde koks en culinaire specialisten die hun kennis en kunsten delen met de thuiskok. **hetkookt** heeft een aantal van hun recepten voor je geselecteerd om als voorbeeld te dienen. Ze zijn van de zogenaamde categorie ‘De Eerlijke Keuken’, met slow cooking, pure ingrediënten en alles thuis zelf maken. 

## de recepten

**hetkookt** is om te beginnen een leeg digitaal kookschrift dat gevuld kan worden. De recepten die **hetkookt** biedt vinden hun oorsprong in bestaande kookboeken. Ze zijn zodanig bewerkt dat je ze samen kunt gebruiken, ondanks de inhoudelijke en redactionele verschillen tussen die kookboeken onderling. Zowel de lijst met ingrediënten als de beschrijving van de werkwijze zijn dus geen letterlijke weergave van die recepten. De beschijving van de recepten is zo bondig mogelijk, maar tegelijkertijd heel precies (milliliter en gram). Voor de werkelijke inhoud wordt verwezen naar de respectievelijke kookboeken zelf, met een bronvermelding, een boekbeschrijving en met een link naar de uitgever. Die daarmee de aandacht krijgt die het verdient. Een kookboek uitgeven is ook een kunst!

## persoonlijk, lokaal en seizoensgebonden koken

De kunst van lekker eten is na de taal het eerste wat jouw identiteit bepaalt. Volgens het bekende gezegde: 'Je bent wat je eet en je eet wat je eten eet'. De technieken zijn universeel toepasbaar, overgewaaid uit alle windstreken, maar koken is ook vanwege de verkrijgbaarheid van de (verse!) ingrediënten vooral een lokale en seizoensgebonden bezigheid. hetkookt is dus een persoonlijk kookschrift. De recepten uit jouw kookschrift kan je emailen naar een vriend.

## aanvullingen en suggesties

Suggesties voor nieuwe recepten/kookboeken graag mailen naar <studio@roozen.nl>. Dit kan ook middels de functie 'Stuur het recept naar een vriend' in een zelf aangemaakt kookschriftrecept.

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
