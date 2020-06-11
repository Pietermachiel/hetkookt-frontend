import React from "react";
import { kalender, hetjaar, theweek } from "../common/common";
import { doSave } from "../../services/userService";

const AddpanelWeekmenu = ({
  isOpen,
  therecipe,
  thecart,
  me,
  setMe,
  // doSave,
  // setIsOpen,
  handleIsOpen,
}) => {
  const handleSave = (me, setMe, therecipe, hetjaar) => {
    doSave(me, setMe, therecipe, hetjaar);
    // props.history.push(props.location.pathname);
    handleIsOpen(!isOpen);
  };

  return (
    <div className="add">
      <div
        // onMouseLeave={() => handleIsOpen()}
        className={`action-panel ${isOpen ? "action-panel__open" : null}`}
      >
        <div className="zetophetweekmenu-box">
          <h6 className="pt-24 pb-5 mx-auto">week {theweek()}</h6>
          <button className="btn-menu" onClick={handleIsOpen}>
            <svg width="100" height="100" viewBox="0 0 50 50">
              <path d="M14.691,13.382l21.101,21.101" />
              <path d="M35.792,13.382l-21.102,21.101" />
            </svg>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-10 p-24">
          {kalender.map((k, xid) => {
            var cart = thecart.filter((c) =>
              c.date ? c.date.includes(k.year) : null
            );
            return (
              <div
                key={k.index}
                onClick={() => handleSave(me, setMe, therecipe, hetjaar(xid))}
                className={`relative ${
                  cart.length !== 0
                    ? "bg-orange-300 hover:bg-orange-400"
                    : "bg-gray-300 hover:bg-gray-400"
                } text-black rounded-50 h-48 w-48 mb-20`}
              >
                <div className="absolute inset-0">
                  <span className="flex justify-center pt-12">{k.index}</span>
                </div>
                <div className="absolute inset-0">
                  <span className="flex justify-center kalender-index">
                    {/* {k.day !== "vandaag" ? k.index : null} */}
                    {k.day.slice(0, 2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="maandjaar">april 2020</p>
      </div>
    </div>
  );
};

export default AddpanelWeekmenu;
