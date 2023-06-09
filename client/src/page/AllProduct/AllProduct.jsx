import React, { useEffect, useState } from "react";
import style from "./allProduct.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProductItem from "../../components/productItem/ProductItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
import { Container, Grid, MenuItem, Pagination, Select } from "@mui/material";
import { getProducts } from "../../store/apiCall";

export default function AllProduct() {
  const [data, setData] = useState([]);

  const [sortType, setSortType] = useState("default");
  const [filterType, setFilterType] = useState("default");
  const [page, setPage] = useState(1);

  const searchTerm = useSelector((state) => state.search.searchTerm);
  const isFetching = useSelector((state) => state.search.isFetching);
  const count = Math.ceil(data.length / 12);

  const handleChange = (_, value) => {
    setPage(value);
  };

  const visitedPage = (page - 1) * 12;

  const displayPage = data.slice(visitedPage, visitedPage + 12);

  useEffect(() => {
    getProducts(searchTerm, filterType, sortType)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm, filterType, sortType]);

  return (
    <div>
      <Header />
      <Container maxWidth="xl" className={style["allProductWrapper"]}>
        <Grid container justifyContent="space-between">
          <h2 className={style["category-title"]}>GIÀY NỮ</h2>
          <div className={style["toolbar-mode"]}>
            <div className={style["toolbar-left"]}>
              BỘ LỌC :
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ width: 120, height: 40, ml: 1 }}
              >
                <MenuItem value="default">
                  <em>Mặc định</em>
                </MenuItem>
                <MenuItem value="shoe">Giày</MenuItem>
                <MenuItem value="sandal">Dép</MenuItem>
              </Select>
            </div>

            <div className={style["toolbar-right"]}>
              SẮP XẾP :
              <Select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  width: 160,
                  height: 40,
                  textAlign: "center",
                  ml: 1,
                }}
              >
                <MenuItem value="default">
                  <em>Mặc định</em>
                </MenuItem>
                <MenuItem value="ascending"> A - Z</MenuItem>
                <MenuItem value="descending"> Z - A</MenuItem>
                <MenuItem value="highprice">Giá cao tới thấp</MenuItem>
                <MenuItem value="lowprice">Giá thấp tới cao</MenuItem>
              </Select>
            </div>
          </div>
        </Grid>

        <Container maxWidth="xl" className={style["test"]}>
          <Grid
            container
            spacing={8}
            className={style["category-product-list"]}
          >
            {isFetching ? (
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
            ) : (
              displayPage.map((item) => (
                <Grid item lg={3} md={3} sm={6} xs={12} key={item._id}>
                  <div className={style["test"]}>
                    <ProductItem item={item} />
                  </div>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
        <div className={style["pagination"]}>
          <Stack spacing={2}>
            <Pagination count={count} page={page} onChange={handleChange} />
          </Stack>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
