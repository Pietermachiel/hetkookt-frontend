import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWitdh from "../common/use-current-width2";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const markdown = `

**Met **HetKookt** kan je kookrecepten op een georganiseerde manier opslaan in een persoonlijk kookschrift en bewaren voor eigen gebruik, met handige functies, zoals relaties tussen recepten, een weekmenu en boodschappenlijst, voorraadbeheer en vele zoekmogelijkheden.**

Ook met voorbeeldrecepten die je zelf kunt aanpassen in je eigen kookschrift. Kook met verse, lokale ingrediënten. Koop geen gemaksproducten maar maak alle sauzen en smaakmakers zelf. Bak je eigen brood.

Maak je eigen [Kookschrift](/mijnrecepten)!

## hoe **HetKookt** werkt

Maak eerst een [account](/register) aan (je kan het op ieder moment weer verwijderen).
1. Ga naar de [Recepten](/collections) van **HetKookt** en kies een recept, klik op de titel en zet in je kookschrift. Je kan zoeken op **Gerechten** of op **Ingrediënten**. 
2. Of open meteen je [Kookschrift](/mijnrecepten) en maak zelf een nieuw recept.

![alt text](/img/schema.png "Hoe HetKookt werkt")

3. Het gekozen of zelfgemaakte recept staat nu in je [Kookschrift](/mijnrecepten). Hier kan je het ook weer verwijderen.
4. Klik in het [Kookschrift](/mijnrecepten) op de titel van een recept en je kunt aan de slag. Nu kan je het recept ook in het [Weekmenu](/weekmenu) zetten of aanpassen naar eigen inzicht.
5. Het [Weekmenu](/weekmenu) loopt telkens van de huidige dag tot en met de dagen van de komende week. Totaal steeds acht dagen, genoeg voor een week verse boodschappen. Dus het recept dat je voor vandaag op het menu zet is morgen verdwenen, al blijft het wel op datum geregistreerd in je account. Als je op de datum klikt kom je in het **Weekmenu** terecht. Je kan een recept meerdere dagen op het menu zetten en ook meerdere recepten op een dag.
6. De verse ingrediënten worden in het [Weekmenu](/weekmenu) getoond omdat ze automatisch bij de [Boodschappen](/boodschappen) komen te staan. Hier kan je ze ook stuk voor stuk verwijderen mocht je het ingrediënt al in huis hebben.
7. In [Boodschappen](/boodschappen) worden de hoeveelheden van gelijke ingrediënten bij elkaar opgeteld en heb je nogmaals de kans om ze te verwijderen. In [Weekmenu](/weekmenu) zijn ze op dat moment ook overal verwijderd. Daar heb je dan weer de mogelijkheid om per recept een vergissing te herstellen en het ingrediënt weer op de boodschappenlijst te zetten.
8. In [Boodschappen](/boodschappen) wordt de vraag gesteld "Is alles op voorraad?". We gaan er van uit dat bij jou alles op voorraad is, maar in [Voorraad](/voorraad) kan je controleren of dat voor de benodigde houdbare ingrediënten ook zo is.
9. Als je op zoek gaat naar een nieuw recept zal je zien dat de reeds geselecteerde recepten in het zoekresultaat voor de overzichtelijkheid nu zwart zijn met een rode bookmark. Zo kan je een recept maar een keer selecteren voor het [Kookschrift](/mijnrecepten). Je eigen recepten zijn blauw.


`;
const Home = ({ user, recipes, ...props }) => {
  const width = useCurrentWitdh();

  if (recipes.length === 0)
    return (
      <div className="container-x">
        <div className="mt-72 hollow-dots-spinner m-auto">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>{" "}
        <div className="m-auto">
          <p className="mt-18 text-36 text-center">
            Wacht even op verbinding met de server
          </p>
        </div>
      </div>
    );

  return (
    <Fragment>
      <div className={`container-y `}>
        {/* ${user && "bg-rose-100"} */}
        <Fragment>
          <div className="mb-48">
            <p className="hetkookt-title flex items-center">
              <Link className="text-red-600 font-700 text-18" to="/about">
                HetKookt! &nbsp;
              </Link>
              {!user && (
                <button className="bg-indigo-600 text-14 p-14 px-30 mt-18 md:mt-0 md:ml-18 align-bottom text-white uppercase tracking-widest">
                  <NavLink to="/register">inschrijven</NavLink>
                </button>
              )}{" "}
            </p>
            <div>
              <ReactMarkdown
                plugins={[gfm]}
                className="kramdown m-auto mb-36"
                children={markdown}
              />
            </div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Home;
