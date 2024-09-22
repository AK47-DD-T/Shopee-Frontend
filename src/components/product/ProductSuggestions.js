import { Button } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import { Link } from "react-router-dom";
import axios from "axios";
const Products = [
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
  {
    thumbnail:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv2uc3o7qrcp85_tn.webp",
    name: "Quần nam Retro wash ống rộng heheheehehehe",
    price: 169.0,
    sold: 6000,
  },
];
const ProductSuggestions = () => {
  const [suggestProducts, setSuggestProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/suggest-products-limit`
        );
        setSuggestProducts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="max-w-[1200px] m-auto ">
      <div className="grid grid-cols-12 place-items-center">
        {suggestProducts.map((value, key) => {
          return <ProductCard value={value} key={key} />;
        })}
      </div>
      <div className="flex justify-center items-center w-full ">
        <Button size="large" className="lg:max-w-[390px] w-full my-4">
          Xem Thêm
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ProductSuggestions);
