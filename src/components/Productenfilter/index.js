import React from "react";
import { Link } from "react-router-dom";
import products from "../../data/products.json";

const Productenfilter = () => {
  return (
    <div className="producten-filter">
      {products.map((p, xid) => {
        // console.log(p);
        return (
          <div key={xid}>
            <Link to={`/categories/${p}`}>
              <p className={" " + p}>{p}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Productenfilter;
