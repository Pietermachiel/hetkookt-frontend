import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const About = () => {
  const markdown = `

**HetKookt is een digitaal kookschrift voor kookboekrecepten. Bedoeld om die recepten zelf naar eigen inzicht aan te passen of zelf recepten te maken in de eigen keuken thuis. Het is een [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_application) met handige functies, zoals relaties tussen recepten, een weekmenu en boodschappenlijst, voorraadbeheer en vele zoekmogelijkheden.**

## een ode aan kookboeken voor thuis koken

Er bestaat een lange traditie, teruggaand tot [La scienza in cucina e l'arte di mangiar bene](/books/la-scienza-in-cucina-e-l-arte-di-mangiar-bene) van Pellegrino Artusi in 1891 en wellicht nog veel verder terug, van vermaarde koks die hun kunsten delen met de thuiskok. Dat zijn de kookboeken waaruit **HetKookt** de recepten heeft geselecteerd. Ze zijn van de zogenaamde categorie ‘De Eerlijke Keuken’, met slow cooking, pure ingrediënten en alles thuis zelf maken. De koks in deze categorie zijn vrijwel zonder uitzondering autodidact en hebben het koken voor zichzelf opnieuw uitgevonden. En dan is het maken van een goed kookboek voor thuiskoks nog weer een kunst apart.


> Cooking is a troublesome sprite. Often it may drive you to despair. Yet it is also very rewarding, for when you do succeed, or overcome a difficulty in doing so, you feel the satisfaction of a great triumph.

> If you do not aspire to become a premier cook, you do not need to have been born with a pan on your head to become a good one. Passion, care, and precision of method will generally suffice; then, of course, you must use the finest ingredients as your raw materials, for these will make you shine.

> **Pellegrino Artusi** [La scienza in cucina e l'arte di mangiar bene](/books/la-scienza-in-cucina-e-l-arte-di-mangiar-bene)

## de recepten

**HetKookt** is om te beginnen een leeg digitaal kookschrift dat gevuld kan worden. De recepten van **HetKookt** vinden hun oorspong in bestaande kookboeken en zijn bewerkt tot een onderling samenhangend geheel. Ze dienen als voorbeeld hoe je een kookboekrecept samenhangend met andere recepten in je kookschrift kunt invoeren. Als je een account aanmaakt kan je ze stuk voor stuk, en zo nodig steeds opnieuw, naar eigen smaak aanpassen. Zo wordt je aangespoord om die kookboeken, maar ook andere kookboeken, zelf aan te schaffen en nog meer recepten op dezelfde manier in je kookschrift op te nemen.

## de selectie

De recepten die 'HetKookt' biedt vinden hun oorsprong in bestaande kookboeken. De beschrijving is een parafrase van die recepten, zodanig dat een consequent en eenvormig systeem ontstaat ondanks de inhoudelijke en redactionele verschillen tussen die kookboeken onderling. Zowel de lijst met ingredienten als de beschrijving van de werkwijze zijn dus geen letterlijke weergave van die recepten. Voor de werkelijke inhoud wordt verwezen naar de respectievelijke kookboeken zelf, met een bronvermelding, een boekbeschrijving en met een link naar de uitgever. Die daarmee de aandacht krijgt die het verdient. Een kookboek uitgeven is ook een kunst!

## de redactie

De beschijving van de recepten is zo bondig mogelijk, maar tegelijkertijd heel precies. Zo veel mogelijk worden alle hoeveelheden aangegeven in milliliter en gram van de schone ingredienten. Bij de boodschappenlijst dient met dit gegeven rekening gehouden te worden.
## hoe **HetKookt** werkt

Maak eerst een account aan, het is [safe and secure](https://en.wikipedia.org/wiki/Multi-factor_authentication) en op ieder moment weer te verwijderen.
1. Ga naar de [Recepten](/collections) van **HetKookt** en kies een recept, klik op de titel en zet in je kookschrift. Je kan zoeken op **Gerechten** of op **Ingrediënten**. Het is gesorteerd op het belangrijkste ingrediënt.
2. Of open meteen je [Kookschrift](/mijnrecepten) en maak zelf een nieuw recept.

![alt text](/img/schema.png "Hoe HetKookt werkt")

3. Het gekozen of zelfgemaakte recept staat nu in je **Kookschrift**. Hier kan je het ook weer verwijderen.
4. Klik in het [Kookschrift](/mijnrecepten) op de titel van een recept en je kunt aan de slag. Nu kan je het recept ook in het weekmenu zetten of aanpassen naar eigen inzicht.
5. Het weekmenu loopt telkens van de huidige dag tot en met de dagen van de komende week. Totaal steeds acht dagen, genoeg voor een week verse boodschappen. Dus het recept dat je voor vandaag op het menu zet is morgen verdwenen, al blijft het wel op datum geregistreerd in je account. Als je op de datum klikt kom je in het **Weekmenu** terecht. Je kan een recept meerdere dagen op het menu zetten en ook meerdere recepten op een dag.
6. De verse ingrediënten worden in het weekmenu getoond omdat ze automatisch bij de **Boodschappen** komen te staan. Hier kan je ze ook stuk voor stuk verwijderen mocht je het ingrediënt al in huis hebben.
7. In **Boodschappen** worden de hoeveelheden van gelijke ingrediënten bij elkaar opgeteld en heb je nogmaals de kans om ze te verwijderen. In **Weekmenu** zijn ze op dat moment ook overal verwijderd. Daar heb je dan weer de mogelijkheid om per recept een vergissing te herstellen en het ingrediënt weer op de boodschappenlijst te zetten.
8. In **Boodschappen** wordt de vraag gesteld "Is alles op voorraad?". We gaan er van uit dat bij jou alles op voorraad is, maar in **Voorraad** kan je controleren of dat voor de benodigde houdbare ingrediënten ook zo is.
9. Als je op zoek gaat naar een nieuw recept zal je zien dat de reeds geselecteerde recepten in het zoekresultaat voor de overzichtelijkheid nu zwart zijn met een rode bookmark. Zo kan je een recept maar een keer selecteren voor het **Kookschrift**. Je eigen recepten zijn blauw.

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
