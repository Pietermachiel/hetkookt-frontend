import React from "react";

// div cirkels ipv img/svg, zodat die onMouseOver van kleur kunnen veranderen

const AddpanelNotUsed = () => {
  return (
    <div className="grid grid-cols-4 gap-10 pt-24 px-24 mt-18">
      {kalender.map((k, xid) => {
        var cart = thecart.filter((c) =>
          c.date ? c.date.includes(k.year) : null
        );
        return (
          <div
            key={k.index}
            // onClick={() => handleSave(therecipe, hetjaar(xid))}
            className={`relative ${
              cart.length !== 0 ? "bg-orange-400" : "bg-gray-400"
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
  );
};

export default AddpanelNotUsed;
