import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";

const About = () => {
  const markdown = `
  

  #### Markdown kramdown

  # Headers
  
  ~~~
  
  # An h1 header
  ## An h2 header 
  ### An h3 header
  #### An h4  *italic* header 
  ##### An h5 **bold** header 
  ###### An h6 header 
  
  Alternatively, for H1 and H2, an underline-ish style:
  
  An h1 header
  ============
  
  An h2 header
  ------------
  
  ~~~
  
  # An h1 header
  ## An h2 header 
  ### An h3 header
  #### An h4  *italic* header 
  ##### An h5 **bold** header 
  ###### An h6 header 
  
  <br>
  
  ---
  
  # Emphasis
  
  ~~~
  
  
  1. *italic* 
  
  2. _italic_
  
  3. **bold** 
  
  4. __bold__ 
  
  5. 'monospace'
  
  
  ~~~
  
  1. *italic*
  
  2. _italic_
  
  3. **bold** 
  
  4. __bold__ 
  
  5. 'monospace'
  
  
  <br>
  
  ---
  
  # Extra
  
  ~~~
  
  1. ~~linethrough~~
  
  2. *italic kleur*{:.oranje} 
  
  3. *italic lighter*{:.lighter}
  
  4. 'code papier'{:#papier}{:.papier}
  
  5. [link something](test.html){:rel='something'} 
  
  6. **reverse**{:.reverse}
  
  ~~~
  
  6. ~~linethrough~~
  
  7. *kleur*{:.oranje} 
  
  8. *italic lighter*{:.lighter} 
  
  9. 'code papier'{:#papier}{:.papier}
  
  10. [link something](test.html){:rel='something'} 
  
  11. **reverse**{:.reverse}
  
  
  <br>
  
  ---
  
  # Marks
  
  
  ~~~
  
  'quote' 
  
  "quote"
  
  superscript 2^(nd) 2^o C
  
  sentence with footnote.[^1]
  
  [^1]: <small>Here is the text of the footnote itself.</small>
  
  -- afbreekstreepje --
  
  --- gedachtenstreepje ---
  
  Unicode is supported: ☺
  
  Font-awesome supported:
  <span class="fa-stack fa">
    <i class="fa fa-github fa-stack-2x"></i>
  </span>
  
  ~~~
  
  'quote'
  
  "quote"
  
  superscript 2^(nd) 2^o C
  
  sentence with footnote.[^1]
  
  [^1]: <small>This is a footnote.</small>
  
  -- afbreekstreepje --
  
  --- gedachtenstreepje ---
  
  Unicode is supported: ☺
  
  Font-awesome supported:
  <span class="fa-stack fa">
    <i class="fa fa-github fa-stack-2x"></i>
  </span>
  
  
  <br>
  
  ---
  
  # Links
  
  ~~~
  
  paragraph link [Link to me](#link-to-me)
  
  external link [Publysher blog](http://blog.publysher.nl/)
  
  sentence with footnote.[^2]
  
  [^2]: <small>Here is the text of the footnote itself.</small>
  
  ~~~
  
  
  paragraph link [Link to me](#link-to-me)
  
  external link [Publysher blog](http://blog.publysher.nl/)
  
  sentence with footnote.[^2]
  
  (text footnote at page end)
  
  [^2]: <small>Here is the text of the footnote itself.</small>
  
  
  <br>
  
  ---
  
  # Images
  
  ~~~
  
  ![alt text](../img/stencyl/step9-1.png "No More Lives Triggered?")
  
  ~~~
  
  ![alt text](../img/stencyl/step9-1.png "No More Lives Triggered?")
  
  
  <br>
  
  ---
  
  
  
  

`;

  return (
    <Fragment>
      <div className="container-x">
        <h1 className="hetkookt-title">About</h1>

        <ReactMarkdown className="kramdown" children={markdown} />

        <p>
          <strong>hetkookt</strong> is een digitaal kookschrift met een bonte
          verzameling basisrecepten uit alle windstreken en voor de serieuze
          thuiskok.
          <br />
          Zelf kan ik het nog amper geloven maar mijn kook-app hetkookt is af.
          Anders dan bij het maken van een (kook)boek betekent af bij een app
          het begin. Naar mijn bescheiden mening bestaat er geen vergelijkbare
          app in zijn soort.
          <br />
          Het is een ‘progressive web app’
          https://en.wikipedia.org/wiki/Progressive_web_application, en die
          werkt dus ook offline. Je zult hem niet vinden in een app store, want
          niet native. De app werkt vanzelfsprekend wel op een mobiel, alleen
          gewoon prettiger op een laptop of tablet. recepten zijn geen
          gebruiksaanwijzing Eerst iets over recepten in het algemeen. Veelal
          worden recepten letterlijk opgevat, als een soort gebruiksaanwijzing.
          Maar zo werkt het meestal niet, want keukens, apparatuur,
          oventemperaturen, ingrediënten, niet te vergeten smaken en wat dies
          meer zij, kunnen verschillen. Een recept is dus eigenlijk eerder een
          uitgangspunt dat getest moet worden in de eigen keukensituatie. Dan is
          het handig om daar een aantekening van te maken voor de volgende keer.
          Iedere serieuze thuiskok heeft wel zo’n kookschrift en de kookapp
          HetKookt is precies op die manier bedoeld. De serieuze thuiskok met
          een kookschrift is de doelgroep. wat er schort aan bestaande kookapps
          Ik heb goed gekeken naar een paar food apps die ik voorbeeldig vind,
          zoals van NYT cooking.nytimes.com, BBC https://www.bbc.co.uk/food en
          The Guardian https://www.theguardian.com/tone/recipes. Natuurlijk kan
          hetkookt aan de omvang en reikwijdte van die apps niet tippen. Maar
          het blijkt al snel, ondanks hun onuitputtelijke diversiteit, dat de
          kookstijl, terminologie en ingrediënten niet aansluiten bij de
          routines van een Nederlandse thuiskok. En je kan die recepten dan wel
          bewaren, maar weer niet aanpassen. Aanpassen kan wel bij het
          kookschrift van AH, maar daar is het rijp en rot door elkaar, er is
          geen koppeling met goede voorbeelden, en je eindigt altijd weer met
          een te veel aan (voorgekookte!) boodschappen in je AH-mandje. lokaal
          en seizoensgebonden koken hetkookt is niet gemaakt vanuit een
          'verdienmodel', zoals AH of kookwebsites waarvan er al genoeg zijn,
          maar vanuit de wens voor een digitaal kookschrift. Voor een Nederlands
          kookschrift welteverstaan, want koken is naar mijn mening, al zijn de
          technieken universeel, vanwege de verkrijgbaarheid van de (verse!)
          ingrediënten vooral een lokale en seizoensgebonden bezigheid. Voor
          hetkookt heb ik een aantal functies verzonnen die uniek zijn en
          tegelijkertijd mijns inziens onontbeerlijk voor het gebruik ervan.
          hetkookt heeft unieke functies 1. Uniek is dat ieder recept uit de
          collectie van hetkookt in je eigen profiel bewaard kan worden en kan
          worden aangepast naar eigen inzicht. De collectie recepten dient dus
          als inspiratie en als tip voor een goed kookboek en niet als
          gebruiksaanwijzing voor hoe je moet koken. Tegelijkertijd is er de
          mogelijkheid om eigen recepten in te voeren, op het menu te zetten en
          een boodschappenlijst te genereren, die je vervolgens kunt delen of
          als bestelling kunt sturen naar je favoriete leverancier. 2. In het
          algemeen geldt dat recepten meestal bestaan uit meerdere onderdelen,
          die je in andere combinaties zou kunnen gebruiken. Daaraan is bij
          hetkookt zoveel mogelijk tegemoet gekomen door recepten (ook uit
          verschillende kookboeken) te splitsen en te hercombineren. Ook nieuwe
          eigen recepten kunnen van die functie gebruik maken. De collectie
          recepten van hetkookt dient dus als basis voor een eigen kookschrift.
          3. Over de selectie van de kookboeken en de recepten: Alle
          geselecteerde kookboeken zijn van de zogenaamde categorie ‘De Eerlijke
          Keuken’, met slow cooking, pure ingrediënten en alles thuis zelf
          maken. Geschreven door vermaarde koks die hun kunsten wilden vertalen
          voor de thuiskok, welk gebruik een lange traditie kent, teruggaand tot
          'La scienza in cucina e l'arte di mangiar bene’ van Pellegrino Artusi
          in 1891 en wellicht nog veel verder terug. Voor ieder kookboek zal de
          redactie van de recepten min of meer uniek zijn en onvergelijkbaar met
          andere. Ook zal ieder boek zich op een unieke manier willen
          onderscheiden. Ik heb echter eerder naar de overeenkomsten gekeken en
          de meest gangbare recepten uitgekozen. Het zijn veelal klassiekers en
          basisrecepten en zoveel mogelijk gespreid over de gehanteerde
          categorieën. Het hoeveel van de ingrediënten heb ik in de meeste
          gevallen letterlijk overgenomen, of anders teruggebracht tot voor 3-4
          personen. De instructies zijn geredigeerd en in telegramstijl, dus
          voor de goede verstaander. Ook geen foto's. Alles ten faveure van het
          persoonlijke initiatief en stijlgevoel! De referentie van het boek
          leidt naar de uitgever van de originele uitgave, de datering is van de
          eerste uitgave. De recepten uit bekende kookboeken is overigens niet
          essentieel voor de app, ze zouden in een later stadium vervangen
          kunnen worden door een onder (een nog te vormen) redactie
          samengestelde en wellicht beter uitgebalanceerde collectie met
          misschien wel 2.000 recepten in plaats van de ca. 200 die het nu
          bevat. 4. Er is een grote verscheidenheid zoekfuncties ingebouwd:
          receptnaam, categorie/ingredient, gerecht/ingredient, vers/ingredient,
          kookboek/recept. 5. Bij ieder recept zijn de verse en houdbare
          ingrediënten gescheiden. We gaan er in de sectie boodschappen van uit
          dat al het houdbare op voorraad is, maar in de sectie voorraad kan je
          controleren of wat je nodig hebt ook werkelijk nog in huis is. 6. We
          werken zo veel mogelijk met exacte maten. Niet omdat het zo moet, want
          je kan het aanpassen, maar om een precies en verifieerbaar
          uitgangspunt te hebben voor hoe het bedoeld is. Bijvoorbeeld een
          'handje basilicum' is erg vaag en als het resultaat eenmaal op tafel
          zal staan ben je al weer vergeten hoeveel je uiteindelijk gebruikt
          hebt. Volg het advies van Heston Blumenthal en werk met precieze
          maten, dus niet alleen bij het bakken, maar ook bij het koken! 7. Een
          steeds terugkomend thema is dat je alles zelf kunt maken in eigen
          keuken ('Weet wat je eet, want je bent wat je eet, en je bent wat je
          eten eet’). Er is onder meer een grote collectie sauzen opgenomen. Dat
          je dan bijvoorbeeld Harissa ook in een tube kan kopen kan je zelf wel
          verzinnen, toch? een eigen profiel bij hetkookt Van al deze
          functionaliteit kan je gebruik maken zodra je een eigen profiel hebt
          aangemaakt. Inschrijven is safe en secure met two factor authorisation
          (2FA). Dat wil zeggen met een email bevestiging. Je kunt op ieder
          moment ook weer uitschrijven, let op want je kookschrift gaat dan wel
          verloren. wordt een betere thuiskok! hetkookt is bedoeld om door het
          gebruik een betere thuiskok te worden. Maar zoals met alles wat nieuw
          is, zal het wel even duren voor deze eigenwijze kookapp bij de
          doelgroep aanslaat. Of het ook echt gaat werken zal de tijd leren.
          Mijn fantasie is om hiermee een soort kookclub te stichten, en
          daarmee, onder een nog te vormen redactie van hetkookt, de ultieme
          basis voor het (Nederlandse) thuiskoken op te zetten. Misschien
          vergezeld van eigen kookboek, een kookcursus of een blog. Wat straks
          bij elkaar misschien zo goed is dat je er net als voor
          cooking.nytimes.com 5 euro per maand voor over hebt om het te kunnen
          gebruiken. Want om zo’n project in de toekomst in de lucht te houden
          kan het niet bestaan zonder financiering, ook als de reikwijdte
          misschien maar beperkt is tot Nederland en België. Bedenkt wel dat dit
          slechts het begin is, er zullen nog heel veel fouten, bugs en
          onvolkomenheden naar boven komen. Ik hoop daarom in ieder geval op je
          eerlijke en onverbiddelijke feedback.
        </p>
      </div>
    </Fragment>
  );
};

export default About;
