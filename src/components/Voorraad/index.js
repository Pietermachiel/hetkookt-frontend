import React, { Fragment, useState } from "react";
// import stock from "./stock.json";

const Voorraad = ({ stock, ...props }) => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("alles is op voorraad");

  const handleClick = (value) => {
    console.log("de value");
    console.log(value);
    const isOnTheList = items.includes(value);
    if (isOnTheList) return null;
    else setItems([...items, value]);
  };

  const addItem = (e) => {
    const trimmedText = e.trim();

    if (trimmedText.length > 0) {
      setItems([...items, trimmedText]);
    }
    setValue("");
  };

  const removeItem = (todoindex) => {
    const newitems = items.filter((item, index) => {
      return index !== todoindex;
    });

    setItems(newitems);
  };

  console.log(stock);

  return (
    <Fragment>
      <div className="boodschappen">
        {/* <h1>Boodschappen</h1> */}
        <div className="grid grid-cols-5">
          {stock.map((s) => (
            <div className="">
              <p>{s.title}</p>
            </div>
          ))}
        </div>

        <form
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
        </form>
        {items.map((item, index) => {
          return (
            <div key={index} className="">
              {item}&nbsp;&nbsp;
              <span className="rood" onClick={() => removeItem(index)}>
                x
              </span>
            </div>
          );
        })}
        <div className="filter-box__stock">
          {items.length === 0 && <p>alles is op voorraad</p>}
        </div>
      </div>
      <div className="container-x">
        {/* <div className="container-chapeau">Voorraadkast</div> */}

        <div className="voorraadkast">
          <div className="home-box grid-0 grid-laptop-1024">
            <h2>Voorraad</h2>
            <div className="menu-box__inner">
              {stock.map((item) => (
                <div key={item.index} className="storage-item">
                  <strong>{item.title}</strong>
                  {item.item.map((hit, index) => (
                    <li key={index}>
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
                  ))}
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
