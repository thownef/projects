import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import styles from "./home.module.css";
import shopnow from "../../assets/images/shopnow.jpg";
import ProductItem from "../../components/productItem/ProductItem";
import Footer from "../../components/Footer/Footer";
import { getProducts } from "../../store/apiCall";
import { Grid } from "@mui/material";

export default function Home() {
  const [data, setData] = useState([]);
  const [hotProduct, setHotProduct] = useState([]);
  const [hotShoe, setHotShoe] = useState([]);
  const [hotSadal, setHotSandal] = useState([]);

  useEffect(() => {
    getProducts("", "default", "default")
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const sliceProduct = data.slice(0, 4);
    setHotProduct(sliceProduct);
  }, [data]);

  useEffect(() => {
    const filterShoe = data.filter((item) => item.category === "shoe");

    const sliceShoe = filterShoe.slice(0, 4);

    setHotShoe(sliceShoe);
  }, [data]);

  useEffect(() => {
    const filterSandal = data.filter((item) => item.category === "sandal");

    const sliceSandal = filterSandal.slice(0, 4);

    setHotSandal(sliceSandal);
  }, [data]);

  return (
    <div>
      <Header />
      <Slider />
      <div className={styles["homeWrapper"]}>
        <div
          style={{
            padding: "20px 0",
            textAlign: "center",
            fontSize: "1.3rem",
            fontWeight: "300",
          }}
        >
          <p className={styles["home__shoe-title"]}>SẢN PHẨM BÁN CHẠY</p>
        </div>
        <div className={styles["selling"]}>
          <div className={styles["home__selling--button"]}>
            <img src={shopnow} alt="" />
          </div>
          <div className={styles["home__selling--list"]}>
            <Grid container>
              {hotProduct.map((item) => (
                <Grid item lg={6} md={6} sm={6} xs={12} key={item._id}>
                  <div className={styles["home__selling--item"]}>
                    <ProductItem item={item} />
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        <div className={styles["home__shoe"]}>
          <p className={styles["home__shoe-title"]}>GIÀY CAO GÓT NỮ</p>

          <Grid container spacing={2}>
            {hotShoe.map((item) => (
              <Grid item lg={3} md={3} sm={6} xs={12} key={item._id}>
                <div className={styles["home__shoe--item"]}>
                  <ProductItem item={item} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>

        <div className={styles["home__shoe"]}>
          <p className={styles["home__shoe-title"]}>DÉP CHO NỮ</p>
          <Grid container spacing={2}>
            {hotSadal.map((item) => (
              <Grid item lg={3} md={3} sm={6} xs={12} key={item._id}>
                <div className={styles["home__shoe--item"]}>
                  <ProductItem item={item} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}
