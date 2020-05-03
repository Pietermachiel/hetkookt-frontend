import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useCurrentWidth from "../common/use-current-width";
import useCurrentHeight from "../common/use-current-height";
import useCurrentScroll from "../common/use-current-scroll";
import { slugify, kalender } from "../common/common";
import Productenfilter from "../CategoriesFilter/index";

const Categories = ({ thecart, sorts, recipes, ...props }) => {
  // console.log(sorts);

  const width = useCurrentWidth();
  const height = useCurrentHeight();
  const scroll = useCurrentScroll();
  const offset = 167;
  const box = 272;
  const boxheight = height + scroll;
  return (
    <>
      {/* <div className="">
        <Productenfilter sorts={sorts} />
      </div> */}
      <div className="container-x">
        <h1 className={`text-48 mb-18 ${props.match.params.id}`}>
          {props.match.params.id}
          <Link to="/">
            <span className="ml-18 text-19 text-black font-300">> home</span>
          </Link>
        </h1>
        <div className="-ml-15 flex flex-row flex-wrap">
          {sorts.map((sort, index) => {
            // console.log(props.match.params.id);
            // console.log(sort.title);
            if (sort.title === props.match.params.id)
              return (
                <Fragment key={index}>
                  {sort.sorts.map((s, xid) => (
                    <div
                      // className="grid-box unvisable slide work-grid-item"
                      key={xid}
                      className="border border-gray-400 min-h-250 bg-badge w-1/2/10 sm:w-1/2/15 lg:w-1/3/15 xl:w-1/4/15 ml-10 mb-10 md:ml-15 md:mb-15"
                    >
                      <Link to={`/sorts/${slugify(s.title)}`}>
                        <div className="">
                          <img
                            src={`/img/products/product_${slugify(
                              s.title
                            )}.jpg`}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="relative h-60">
                        <p
                          className={`mt-10 uppercase absolute tracking-widest top-0 left-0 text-14`}
                        >
                          <span className="pl-15">{s.title}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </Fragment>
              );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
