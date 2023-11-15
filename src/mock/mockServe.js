import Mock from "mockjs";
// webpack默认对外暴露：图片、JSON数据格式文件
import banner from "./banners";
import floor from "./floors";

/* mock数据：第一个参数是请求地址   第二个参数是请求数据 */
Mock.mock(
  "/mock/banner",
  {
    code: 200,
    data: banner
  }
);
Mock.mock(
  "/mock/floor",
  {
    code: 200,
    data: floor
  }
);