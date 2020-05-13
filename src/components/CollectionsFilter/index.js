import React from "react";

const CollectionsFilter = ({ dishes }) => {
  return (
    <div className="categories-filter">
      {dishes.map((d, xid) => (
        <li key={xid}>{d}</li>
      ))}
    </div>
  );
};

export default CollectionsFilter;
