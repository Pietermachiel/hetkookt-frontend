import React, { Fragment, useState } from "react";
// import stock from "./stock.json";
import { addStock, removeStock } from "../../services/userService";

const Voorraad = ({ me, setMe, stock, ...props }) => {
  const [value, setValue] = useState("");
  // const [items, setItems] = useState([]);
  // const [message, setMessage] = useState("alles is op voorraad");
  if (me.stock === undefined) return (me.stock = []);

  // console.log("items");
  // console.log(items);

  const handleClick = (value) => {
    // console.log("de value");
    // console.log(value);
    // const isOnTheList = items.includes(value);
    // if (isOnTheList) return null;
    // else setItems([...items, value]);
    addStock(me, setMe, value);
  };

  const addItem = (e) => {
    // const trimmedText = e.trim();
    // if (trimmedText.length > 0) {
    //   setItems([...items, trimmedText]);
    // }
    // setValue("");
  };

  const removeItem = (value) => {
    // console.log(title);
    // const newitems = items.filter((item, index) => {
    //   return item !== title;
    // });
    // console.log(newitems);

    removeStock(me, setMe, value);
  };

  return (
    <Fragment>
      <div className="container-x mt-18">
        {/* <h1>Boodschappen</h1> */}
        {stock.map((s, xid) => (
          <Fragment key={xid}>
            <h3 className="mb-18">{s.title}</h3>
            <div className="grid grid-cols-5 mb-18">
              {s.item.map((i, xid) => (
                <Fragment key={xid}>
                  {me.stock.includes(i.title) ? (
                    <p className="font-700 text-red-600">
                      {i.title}{" "}
                      <span onClick={() => removeItem(i.title)}>x</span>
                    </p>
                  ) : (
                    <p
                      onClick={() => handleClick(i.title)}
                      className="hover:text-red-600"
                    >
                      {i.title}
                    </p>
                  )}
                </Fragment>
              ))}
            </div>
          </Fragment>
        ))}

        {/* <form
          // ref={(input) => (addForm = input)}
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            addItem(value);
          }}
        >
          <button className="btn btn-small  btn-small__green" type="submit" />
          &nbsp;
          <input
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Zet dit ook nog op de lijst..."
          />
        </form> */}
        {/* {items.map((item, index) => {
          return (
            <div key={index} className="">
              {item}&nbsp;&nbsp;
              <span className="rood" onClick={() => removeItem(index)}>
                x
              </span>
            </div>
          );
        })} */}
        {/* <div className="filter-box__stock">
          {items.length === 0 && <p>alles is op voorraad</p>}
        </div> */}
      </div>
      <div className="container-x">
        {/* <div className="container-chapeau">Voorraadkast</div> */}

        <div className="voorraadkast">
          <div className="home-box grid-0 grid-laptop-1024">
            <h2>Voorraad</h2>
            <div className="menu-box__inner">
              {stock.map((item, xid) => (
                <div key={xid} className="storage-item">
                  <h4>{item.title}</h4>
                  {item.item.map((hit, index) => {
                    // const myStock = ["arachideolie", "olijfolie"];
                    // console.log(hit.title);
                    return (
                      <Fragment key={index}>
                        {me.stock.includes(hit.title) ? (
                          <li className="font-700 text-indigo-600" key={index}>
                            <button
                              value={hit.title}
                              className="btn btn-small btn-small__green btn-small__selected"
                              onClick={(e) => {
                                e.preventDefault();
                                handleClick(hit.title);
                              }}
                            ></button>
                            &nbsp;{hit.title}
                          </li>
                        ) : (
                          <li className="" key={index}>
                            <button
                              value={hit.title}
                              className="btn btn-small btn-small__green"
                              onClick={(e) => {
                                e.preventDefault();
                                handleClick(hit.title);
                              }}
                            ></button>
                            &nbsp;{hit.title}
                          </li>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
  //   }
};

export default Voorraad;
