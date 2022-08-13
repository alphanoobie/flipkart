import { Input, Layout, Button, Space, Card, Row, Pagination } from "antd";
import "./app.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Search } = Input;

function App() {
  const [productData, setProductData] = useState();
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductData(current);
  }, [current]);

  const getProductData = async (offset) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${(offset*25)-25}&limit=${offset*25}`
      );
      setProductData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePagination = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <>
      <Layout>
        <Header className="header">
          <Search
            placeholder="Search for products brands and more"
            className="searchBox"
          />
          <Button className="loginButton">Login</Button>
        </Header>
        <Header className="categoryHeader">
          <Space size={50}>
            <span>
              <b>Electronics</b>
            </span>
            <span>
              <b>TV & Appliances</b>
            </span>
            <span>
              <b>Men</b>
            </span>
            <span>
              <b>Woman</b>
            </span>
            <span>
              <b>Baby & Kids</b>
            </span>
            <span>
              <b>Home & Furniture</b>
            </span>
            <span>
              <b>Sports, Books & More</b>
            </span>
            <span>
              <b>Flights</b>
            </span>
            <span>
              <b>Offer zone</b>
            </span>
          </Space>
        </Header>

        <Content>
          {loading ? (
            <SyncOutlined spin />
          ) : (
            <>
              <Row>
                {productData &&
                  productData.map((product) => (
                    <Card
                      className="productCard"
                      cover={<img alt="" src={product.images[0]} />}
                    >
                      <p>
                        <b>{product.title}</b>
                      </p>
                      <p>{product.description.substring(0, 25)} ... </p>
                      <p>
                        <b>₹{product.price}</b>
                      </p>
                    </Card>
                  ))}
              </Row>

              <div className="paginationWrapper">
                {productData && (
                  <Pagination
                    total={70}
                    defaultCurrent={1}
                    current={current}
                    onChange={handlePagination}
                  />
                )}
              </div>
            </>
          )}
        </Content>
      </Layout>
    </>
  );
}

export default App;
