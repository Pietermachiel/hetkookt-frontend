import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Markdown = () => {
  const markdown = `

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no 'dangerouslySetInnerHTML' is used! Yay!

## Tables?

| Feature   | Support |
| :-------: | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

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

  <p class="vis">vis<p/>
  
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
  
  2. *italic kleur*{:.vis} 
  
  3. *italic lighter*{:.lighter}
  
  4. 'code papier'{:#papier}{:.papier}
  
  5. [link something](test.html){:rel='something'} 
  
  6. **reverse**{:.reverse}
  
  ~~~
  
  6. ~~linethrough~~
  
  7. *kleur*{:.vis} 
  
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
  
  ![alt text](/img/books/pizzabijbel_title.jpg "No More Lives Triggered?")
  
  ~~~
  
  ![alt text](/img/books/pizzabijbel_title.jpg "No More Lives Triggered?")
  
  
  <br>
  
  ---
  
  
  
  

`;

  return (
    <Fragment>
      <div className="container-x w-750">
        <h1 className="hetkookt-title">Markdown</h1>

        <ReactMarkdown
          plugins={[gfm]}
          className="kramdown"
          children={markdown}
        />
      </div>
    </Fragment>
  );
};

export default Markdown;
