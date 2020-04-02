import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import RecipesTable from "./recipesTable";
// import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
// import { getProducts, deleteProduct } from "../services/productService";
// import { getCategories } from "../services/categoryService";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import SearchBox from "../searchBox";
// import oudedata from "./data/assortiment_all.json";

export default class RecipesApi extends Component {
  state = {
    currentPage: 1,
    pageSize: 100,
    searchQuery: "",
    // selectedCategory: "All Categories",
    sortColumn: { path: "number", order: "asc" }
  };

  // async componentDidMount() {
  //   const { data } = await getCategories();
  //   // voeg All Categories toe aan lijst met categories
  //   // en hernoem tot categories { data: categories }
  //   const categories = [{ _id: "", name: "All Categories" }, ...data];
  //   // console.log(categories);

  //   // hernoem de data: products
  //   const { data: products } = await getProducts();
  //   this.setState({ products, categories });
  // }

  handleDelete = async product => {
    // const originalProducts = this.state.products;
    // const products = originalProducts.filter(m => m._id !== product._id);
    // this.setState({ products });
    // try {
    //   await deleteProduct(product._id);
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 404)
    //     toast.error("This product has already been deleted.");
    //   this.setState({ products: originalProducts });
    // }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleCategorySelect = el => {
    this.setState({ selectedCategory: el, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedCategory: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      // selectedCategory,
      searchQuery
    } = this.state;

    let allRecipes = this.props.recipes;

    let filtered = allRecipes;
    if (searchQuery)
      filtered = allRecipes.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const data = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data };
  };

  render() {
    const { recipes } = this.props;
    const { length: count } = recipes;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>Waiting...</p>;

    const { totalCount, data } = this.getPagedData();

    // console.log(data);

    return (
      <React.Fragment>
        <div className="container-page">
          <p className="showing">
            Showing {totalCount} recipes in the database.
          </p>
          <div className="row">
            {/* <ListGroup
            items={thecategories}
            selectedItem={this.state.selectedCategory}
            onItemSelect={this.handleCategorySelect}
          /> */}
            <div className="">
              {/* <h1>{this.state.selectedCategory.name || "All categories"}</h1> */}
              {user && (
                <Link
                  to="/recipeform/new"
                  className="btn btn-primary"
                  style={{ marginBottom: 20 }}
                >
                  New Product
                </Link>
              )}
              <div className="searchbox-pagination">
                <form className="form-zoekrecept">
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                </form>
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
              <RecipesTable
                data={data}
                sortColumn={sortColumn}
                onSale={this.handleSale}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
