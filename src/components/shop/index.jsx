import { GridOff, GridOn } from "@mui/icons-material";
import { PaginationNav } from "utils/Pagination";
import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "store/brandSlice";
import { byPaginate, selectPaginate } from "store/productSlice";
import { CardBlock } from "utils/products/CardBlock";
import { useGetBrandsQuery, usePaginateProductMutation } from "store/apiSlice";
import { SearchBar } from "./SearchBar";
import classes from "./shop.module.css";
import { CollapseCheckbox } from "./CollapseCheckbox";
import { RangeSelect } from "./Range";

const defaultValues = {
  keywords: "",
  brand: [],
  min: 0,
  max: 50000,
  frets: [],
  page: 1,
};
export const Shop = () => {
  const [grid, setGrid] = useState(false);

  const [query, setQuery] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );

  const [products] = usePaginateProductMutation();
  const {
    data: brands,
    // isLoading: brandsLoading,
    // error: brandError,
    // isError: brandIsError,
  } = useGetBrandsQuery();

  const prod = useSelector(selectPaginate);

  const dispatch = useDispatch();

  const getProducts = useCallback(async () => {
    try {
      const res = await products({ ...query }).unwrap();
      //   console.log(res?.data?.products);
      dispatch(byPaginate({ paginateProduct: res?.data }));
    } catch (err) {
      console.log(err);
    }
  }, [query, products, dispatch]);

  //   console.log(allBrand);
  //   console.log(prod);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    // console.log(brands?.data, "BRANDS");
    dispatch(getBrands({ brands: brands?.data }));
  }, [dispatch, brands]);

  const gotoPage = (page) => {
    console.log(page);

    setQuery({ page: page });
  };

  const resetSearch = () => {
    // setQuery({ keywords: "", paage: 1 });
    setQuery(defaultValues);
  };
  const handleGrid = () => setGrid(!grid);

  const handleKeywords = (values) => {
    setQuery({ keywords: values });
  };

  const handleFilters = (filters, category) => {
    if (category === "brands") {
      setQuery({ brand: filters, page: 1 });
    }
    if (category === "frets") {
      setQuery({ frets: filters, page: 1 });
    }
  };

  const handleRange = (val) => {
    setQuery({ min: val[0], max: val[1], page: 1 });
  };
  return (
    <div className={classes.page_container}>
      <div className={classes.page_top}>
        <div className="container">
          <SearchBar
            handleKeywords={(values) => handleKeywords(values)}
            resetSearch={() => resetSearch()}
          />
        </div>
      </div>

      <div className="container">
        <div className={classes.shop_wrapper}>
          <div className={classes.left}>
            <CollapseCheckbox
              initState={true}
              title="brands"
              list={brands?.data}
              handleFilters={(filters) => handleFilters(filters, "brands")}
            />
            <CollapseCheckbox
              initState={false}
              title="frets"
              list={[
                { _id: 20, name: 20 },
                { _id: 21, name: 21 },
                { _id: 22, name: 22 },
                { _id: 24, name: 24 },
              ]}
              handleFilters={(filters) => handleFilters(filters, "frets")}
            />
            <RangeSelect
              title="Price Range"
              handleRange={(val) => handleRange(val)}
            />
          </div>
          <div className={classes.right}>
            <div className={classes.shop_options}>
              <div className={`${classes.shop_grids} ${classes.clear}`}>
                <div
                  className={`${classes.grid_btn} ${
                    grid ? "" : classes.active
                  }`}
                  onClick={() => handleGrid()}
                >
                  <GridOn />
                </div>
                <div
                  className={`${classes.grid_btn} ${
                    !grid ? "" : classes.active
                  }`}
                  onClick={() => handleGrid()}
                >
                  <GridOff />
                </div>
              </div>
              <div>
                {prod?.paginateProduct?.products?.docs && (
                  <Fragment>
                    <CardBlock
                      grid={grid}
                      items={prod?.paginateProduct?.products?.docs}
                      shop={true}
                    />
                    <PaginationNav
                      prod={prod?.paginateProduct?.products}
                      prev={(page) => gotoPage(page)}
                      next={(page) => gotoPage(page)}
                      resetSearch={() => resetSearch()}
                    />
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
