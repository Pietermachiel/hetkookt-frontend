import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender, uniq } from "../common/common";

const Collections = ({ thecart, sorts, recipes, ...props }) => {
  // const [collection, setCollection] = useState([]);

  // const API = props.match.url;

  // useEffect(() => {
  //   async function getData() {
  //     const res = await fetch(`https://hetkookt.roozen.nl/api${API}.json`);
  //     res.json().then(res => setCollection(res));
  //   }
  //   getData();
  // }, [API]);

  // console.log(props);
  // console.log(dishes);
  // console.log("recipes");
  // console.log(recipes);

  // function uniq(value, index, self) {
  //   return self.indexOf(value) === index;
  // }

  // var unique = myArray.filter((v, i, a) => a.indexOf(v) === i);

  const therecipes = recipes.filter(
    (recipe) => recipe.dish === props.match.params.id
  );
  var selectedtags = therecipes.map((s) => s.tags[0]);
  selectedtags = selectedtags.filter(uniq).filter((e) => e != undefined);

  const collection = selectedtags.map((s) => {
    const selection = therecipes.filter((r) => r.tags[0] === s);
    return { title: s, selection: selection };
  });

  const width = useCurrentWidth();
  const height = useCurrentHeight();
  const scroll = useCurrentScroll();
  const offset = -272;
  const box = 272;
  const boxheight = height + scroll;

  // console.log(categories);
  // console.log(sorts);

  // const category = categories.find(s => s.title === props.match.params.id);
  // if (category === undefined) return [];
  // const catcolor = category.category;

  return (
    <>
      {/* <div className="container-categoriesFilter">
        <CategoriesFilter sorts={sorts} />
      </div> */}
      <div className="container-x">
        <h1 className={`pt-15 text-42 pb-18`}>
          {props.match.params.id}
          <Link to="/">
            <span className="ml-18 text-19 font-300">> home</span>
          </Link>
        </h1>
        {collection.map((col, xid) => {
          return (
            <Fragment key={xid}>
              <div className="-ml-15 flex flex-row flex-wrap">
                <div
                  // className="grid-box unvisable slide work-grid-item"
                  key={xid}
                  className="bg-offblack text-white border border-gray-400 min-h-250 w-1/2/10 sm:w-1/2/15 lg:w-1/4/15 xl:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15"
                >
                  <Link to={`/sorts/${slugify(col.title)}`}>
                    <div>
                      <img
                        src={`/img/products/product_${slugify(col.title)}.jpg`}
                        alt=""
                      />
                    </div>
                  </Link>
                  <div className="relative h-60">
                    <p
                      className={`mt-10 uppercase absolute tracking-widest top-0 left-0 text-14`}
                    >
                      <span className="pl-15">{col.title}</span>
                    </p>
                  </div>
                </div>
                {col.selection.map((recipe, index) => {
                  let cart = thecart.find((c) => c._id === recipe._id);
                  console.log(cart);
                  console.log(thecart);
                  console.log(therecipes);
                  if (cart === undefined) cart = [];
                  const thelength = recipe.tags.length - 1;
                  if (recipe.basics === undefined) return (recipe.basics = []);
                  const red = kalender.find((w) => w.year === cart.date);
                  return (
                    <div
                      key={recipe._id}
                      className={`border border-gray-400 min-h-250 ${
                        recipe.meal === "true" ? "bg-rose" : "bg-badge"
                      } w-1/2/10 sm:w-1/2/15 md:w-1/3/15 lg:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15 unvisable ${
                        width > 992
                          ? boxheight >
                            offset + box * Math.round((index - 3) / 4)
                            ? "slide"
                            : ""
                          : width > 768
                          ? boxheight >
                            offset + box * Math.round((index - 3) / 4)
                            ? "slide"
                            : ""
                          : boxheight >
                            offset + box * Math.round((index - 2) / 2)
                          ? "slide"
                          : ""
                      } work-grid-item ${
                        recipe._id === cart._id
                          ? "grid-box__black"
                          : "grid-box__gray"
                      }`}
                    >
                      <div className={`min-h-full70 p-15`}>
                        <Link to={`/recipe/${slugify(recipe.title)}`}>
                          <h4 className={`break-words mb-15`}>
                            {recipe.title}
                          </h4>
                        </Link>
                        <ul className="mb-12">
                          {recipe.basics.map((b, id) => (
                            <li
                              key={id}
                              className={`mb-0 leading-tight font-700 text-18 md:text-19 `}
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                        {recipe.tags.map((t, id) => (
                          <Fragment key={id}>
                            <span className={`text-16`}>{t}</span>
                            {thelength === id ? "" : ", "}
                          </Fragment>
                        ))}
                      </div>
                      <div className="h-60">
                        <p
                          className={`uppercase tracking-widest text-14 pl-15 pt-7 mb-0`}
                        >
                          {recipe.dish}
                        </p>
                        {/* {kalender.map((w) =>
                          w.year === cart.date ? (
                            <p
                              key={w.index}
                              className={`-mt-21 font-500 text-18 float-right pr-15 pt-11 mb-0 ${
                                red ? "text-red-500" : null
                              }`}
                            >
                              {w.day} {w.index}
                            </p>
                          ) : null
                        )} */}

                        <div className="pt-0 mr-10 flex items-center justify-end">
                          {kalender.map((w, xid) =>
                            cart.date && cart.date.includes(w.year) ? (
                              <NavLink key={w.index} to="/weekmenu">
                                <div
                                  className={`relative mr-6 p-10 w-24 h-24 text-center ${
                                    cart.length !== 0
                                      ? "bg-orange-400"
                                      : "bg-gray-500"
                                  } text-black rounded-50`}
                                >
                                  <span className={`absolute text-12 inset-0`}>
                                    <span className="flex justify-center pt-3">
                                      {w.index}
                                    </span>
                                  </span>
                                </div>
                              </NavLink>
                            ) : null
                          )}
                          {cart.favorite === true ? (
                            <NavLink to="/favorites">
                              <img
                                className="w-25"
                                src="/img/feather/bookmark-red.svg"
                                alt=""
                              />
                            </NavLink>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Collections;
