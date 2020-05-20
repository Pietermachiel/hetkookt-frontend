import React, { useState } from "react";
import stock from "./stock.json";
import {
  Transition,
  TransitionGroup,
  CSSTransition,
} from "react-transition-group";

const Voorraad = ({ ...props }) => {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       buyItems: [],
  //       message: "alles is op voorraad",
  //     };
  //   }
  const [buyItems, setBuyItems] = useState([]);
  const [message, setMessage] = useState("alles is op voorraad");

  const handleClick = (e) => {
    // e.preventDefault();
    // const { buyItems } = this.state;
    // const theValue = e.target.value;
    // const isOnTheList = buyItems.includes(theValue);
    // if (isOnTheList) return null;
    // else
    //   theValue !==
    //     this.setState({
    //       buyItems: [...this.state.buyItems, theValue],
    //       message: "",
    //     });
  };

  const addItem = (e) => {
    // e.preventDefault();
    // // const { buyItems } = this.state;
    // const newItem = newItem.value; // ‘test’
    // const isOnTheList = buyItems.includes(newItem);
    // if (isOnTheList) {
    // } else {
    //   newItem !== "" &&
    //     this.setState({
    //       buyItems: [...buyItems, newItem],
    //       message: "",
    //     });
    // }
    // this.addForm.reset();
  };

  const removeItem = (item) => {
    const newBuyItems = buyItems.filter((buyItem) => {
      return buyItem !== item;
    });
    this.setState({
      buyItems: [...newBuyItems],
      message: "alles is op voorraad",
    });
  };

  //   render() {
  // const { buyItems, message } = this.state;

  return (
    <TransitionGroup>
      <div className="container-x">
        {/* <div className="container-chapeau">Voorraadkast</div> */}
        <div className="boodschappen">
          <div className="home-box grid-0 grid-laptop-1024">
            <div className="shopping-list">
              <br />
              <h1>Boodschappen</h1>
              <form
                // ref={(input) => (addForm = input)}
                className="form"
                onSubmit={(e) => {
                  addItem(e);
                }}
              >
                <button
                  className="btn btn-small  btn-small__green"
                  type="submit"
                />
                &nbsp;
                {/* <input
                  ref={(input) => (newItem = input)}
                  type="text"
                  placeholder="Zet dit ook nog op de lijst..."
                /> */}
              </form>
              {buyItems.map((item) => {
                return (
                  <div key={item} className="content">
                    {item}&nbsp;&nbsp;
                    <span className="rood" onClick={(e) => removeItem(item)}>
                      x
                    </span>
                  </div>
                );
              })}
              <div className="filter-box__stock">
                {buyItems !== "" && <p>{message}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="voorraadkast">
          <div className="home-box grid-0 grid-laptop-1024">
            <h2>Voorraad</h2>
            <div className="menu-box__inner">
              {stock.map((item) => (
                <div key={item.index} className="storage-item">
                  <strong>{item.storage}</strong>
                  {item.product.map((hit) => (
                    <li key={hit}>
                      <button
                        value={hit}
                        className="btn btn-small btn-small__green"
                        onClick={() => handleClick()}
                      ></button>
                      &nbsp;{hit}
                    </li>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  );
  //   }
};

export default Voorraad;
