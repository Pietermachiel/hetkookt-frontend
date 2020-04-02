import React, { Component } from "react";
import auth from "../../services/authService";
import { Link } from "react-router-dom";
import Table from "../common/table";
// import Like from "../common/like";
import { slugify } from "../common/common";

class RecipesTable extends Component {
  columns = [
    // { col: "col-1", path: "number", label: "nr" },
    {
      col: "col-2",
      path: "title",
      label: "Title",
      content: recipe => (
        <Link to={`/test/${slugify(recipe.title)}`}>{recipe.title}</Link>
      )
    },
    { col: "col-3", path: "dish", label: "Dish" },
    { col: "col-4", path: "author", label: "Author" }
    // { col: "col-5", path: "tags", label: "Tags" },
    // { col: "col-6", path: "country", label: "Country" },
    // {
    //   col: "col-7",
    //   path: "isOpen",
    //   label: "IsOpen",
    //   key: "like",
    //   content: recipe => <Like liked={recipe.sale} />
    // }
  ];

  deleteColumn = {
    key: "delete",
    content: recipe => (
      <button
        onClick={() => this.props.onDelete(recipe)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { data, onSort, sortColumn } = this.props;

    return (
      <>
        <Table
          columns={this.columns}
          data={data}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </>
    );
  }
}

export default RecipesTable;
