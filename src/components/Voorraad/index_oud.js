// import React, { Fragment } from "react";
// import { toggleStock, removeStock } from "../../services/userService";
// import AccordionVoorraad from "./AccordionVoorraad";

// const Voorraad = ({ me, setMe, stock, ...props }) => {
//   if (me.stock === undefined) return (me.stock = []);

//   // const addItem = (e) => {
//   //   const trimmedText = e.trim();
//   //   if (trimmedText.length > 0) {
//   //     setItems([...items, trimmedText]);
//   //   }
//   //   setValue("");
//   // };

//   const removeItem = (value) => {
//     removeStock(me, setMe, value);
//   };

//   return (
//     <Fragment>
//       <div className="container-x">
//         <h1 className="mb-36 -mt-20">Voorraad</h1>
//         <div className=" grid-box unvisable slide work-grid-item ">
//           {stock.map((s, xid) => (
//             <Fragment key={xid}>
//               <AccordionVoorraad s={s} title={s.title} me={me}>
//                 <ul className="mb-18 " key={xid}>
//                   {s.item.map((i, xid) => (
//                     <Fragment key={xid}>
//                       {me.stock.includes(i) ? (
//                         <li className="mb-0 py-9 px-24 font-500 bg-orange-400">
//                           {i}{" "}
//                           <span
//                             className="text-red-600 font-500"
//                             onClick={() => removeItem(i)}
//                           >
//                             x
//                           </span>
//                         </li>
//                       ) : (
//                         <li
//                           onClick={() => toggleStock(me, setMe, i)}
//                           className="mb-0 py-9 px-24 bg-green-200"
//                         >
//                           {i} <span className="">+</span>
//                         </li>
//                       )}
//                     </Fragment>
//                   ))}
//                 </ul>
//               </AccordionVoorraad>
//             </Fragment>
//           ))}
//         </div>
//       </div>
//     </Fragment>
//   );
//   //   }
// };

// export default Voorraad;
