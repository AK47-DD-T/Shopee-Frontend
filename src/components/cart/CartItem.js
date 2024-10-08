/* eslint-disable jsx-a11y/alt-text */
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Checkbox, InputNumber, message, Popover } from "antd";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { updateItemQuantity, updateVarients } from "../../services/cartService";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartData,
  updateCartVarients,
  updateVarientQuantity,
} from "../../redux/cartSlice";

const text = <span className="text-lg font-semibold">Phân loại hàng</span>;

const CartItem = (props) => {
  const { item } = props;
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "openPopover":
          return { ...state, openPopover: action.payload };
        case "selectedClassify":
          return { ...state, selectedClassify: action.payload };
        case "currentVarients":
          return { ...state, currentVarient: action.payload };
        case "classifyList":
          return { ...state, classifyList: action.payload };
        case "sizeList":
          return { ...state, sizeList: action.payload };
        default:
          return state;
      }
    },
    {
      selectedClassify: null,
      currentVarient: item?.ProductVarient || null,
      classifyList: [],
      sizeList: [],
      openPopover: false,
    }
  );

  const {
    selectedClassify,
    currentVarient,
    classifyList,
    sizeList,
    openPopover,
  } = state;

  //Side Effect
  useEffect(() => {
    const fetchClassify = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/classify-products?product_id=${item?.ProductVarient?.Product?.product_id}`
        );
        if (res.status === 200) {
          setState({ type: "classifyList", payload: res.data.data });
          if (res.data.data.length > 0 && Array.isArray(res.data.data)) {
            const selectedClassify = res.data.data.find(
              (data) =>
                data.product_classify_id ===
                item?.ProductVarient?.product_classify_id
            );
            if (selectedClassify) {
              setState({
                type: "selectedClassify",
                payload: selectedClassify?.product_classify_id,
              });
            } else {
              setState({
                type: "selectedClassify",
                payload: res?.data?.data?.[0]?.product_classify_id,
              });
            }
          }
        }
      } catch (error) {
        console.log("Lỗi khi fetch dữ liệu phân loại: ", error);
      }
    };
    if (openPopover && item?.ProductVarient?.Product?.product_id) {
      fetchClassify();
    }
  }, [openPopover]);

  useEffect(() => {
    const fetchSize = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/product-varients?product_id=${item?.ProductVarient?.Product?.product_id}&product_classify_id=${selectedClassify}`
        );
        if (res.status === 200) {
          if (res?.data?.data?.[0]?.ProductSize === null) {
            setState({
              type: "currentVarients",
              payload: res?.data?.data?.[0],
            });
          } else {
            if (res.data.data.length > 0 && Array.isArray(res.data.data)) {
              const selectedSize = res.data.data.find(
                (data) =>
                  data.ProductSize.product_size_id ===
                  item?.ProductVarient?.product_size_id
              );
              if (selectedSize) {
                setState({ type: "currentVarients", payload: selectedSize });
              } else {
                setState({
                  type: "currentVarients",
                  payload: res?.data?.data?.[0],
                });
              }
              setState({ type: "sizeList", payload: res.data.data });
            }
          }
        }
      } catch (error) {
        console.log("Lỗi khi fetch dữ liệu size: ", error);
      }
    };
    if (selectedClassify && item?.ProductVarient?.Product?.product_id) {
      fetchSize();
    }
  }, [openPopover, selectedClassify]);

  //Handler
  const handleOpenChange = (newOpen) => {
    setState({ type: "openPopover", payload: newOpen });
  };

  const handleUpdateVarient = async () => {
    try {
      const res = await updateVarients(
        item?.cart_item_id,
        currentVarient?.product_varients_id
      );
      if (res.success) {
        message.success("Cập nhật sản phẩm thành công");

        if (user?.user_id !== "") {
          dispatch(
            updateCartVarients({
              cartItemID: item?.cart_item_id,
              productVarientsID: currentVarient?.product_varients_id,
            })
          );
          dispatch(fetchCartData({ userID: user?.user_id }));
          setState({ type: "openPopover", payload: false });
        }
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật biến thể: ", error);
      message.error(error?.message || "Cập nhật sản phẩm thất bại");
    }
  };

  const handleUpdateQuantity = async (value) => {
    const quantityValue = parseInt(value, 10);
    if (quantityValue !== 0) {
      try {
        const res = await updateItemQuantity(item?.cart_item_id, quantityValue);
        console.log("res", res);
        if (res?.success) {
          if (user?.user_id !== "") {
            dispatch(
              updateVarientQuantity({
                cartItemID: item?.cart_item_id,
                quantity: quantityValue,
              })
            );
            dispatch(fetchCartData({ userID: user?.user_id }));
          }
        }
      } catch (error) {
        console.log("Lỗi khi cập nhật số lượng sản phẩm: ", error);
        message.error(error?.message || "Cập nhật số lượng sản phẩm thất bại");
      }
    }
  };

  //popover content
  const content = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{classifyList[0]?.type_name}</span>
        <div className="flex items-center overflow-y-auto max-h-[220px] max-w-[515px] flex-wrap">
          {classifyList.map((classify) => (
            <button
              onClick={() => {
                if (classify?.total_stock > 0) {
                  setState({
                    type: "selectedClassify",
                    payload: classify?.product_classify_id,
                  });
                }
              }}
              className={`
                ${
                  classify?.total_stock > 0
                    ? "hover:border-primary hover:text-primary cursor-pointer bg-white"
                    : "cursor-not-allowed bg-[#fafafa] text-gray-400"
                }
                
                 ${
                   selectedClassify === classify?.product_classify_id
                     ? "border-primary text-primary"
                     : ""
                 }  items-center  border-[1px] border-solid  rounded box-border inline-flex justify-center mt-2 mr-2 min-h-10 min-w-20 overflow-visible p-2 relative text-left break-words`}
            >
              <img
                loading="lazy"
                src={classify?.thumbnail}
                className="w-6 h-6"
              />
              <span className="ml-2">{classify?.product_classify_name}</span>
              {selectedClassify === classify?.product_classify_id && (
                <>
                  <div className="absolute bottom-0 right-0 size-[15px] overflow-hidden">
                    <IoCheckmarkDone />
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">
          {sizeList[0]?.ProductSize?.type_of_size}
        </span>
        {sizeList.length > 0 && (
          <div className="flex items-center overflow-y-auto max-h-[220px] max-w-[515px] flex-wrap">
            {sizeList.map((size) => (
              <button
                onClick={() => {
                  size?.stock > 0 &&
                    setState({ type: "currentVarients", payload: size });
                }}
                className={`${
                  size?.stock > 0
                    ? "hover:border-primary hover:text-primary cursor-pointer bg-white"
                    : "cursor-not-allowed bg-[#fafafa] text-gray-400"
                } ${
                  size?.stock > 0 &&
                  currentVarient?.ProductSize?.product_size_id ===
                    size?.product_size_id
                    ? "border-primary text-primary"
                    : ""
                } items-center  border-[1px] border-solid rounded box-border  inline-flex justify-center mt-2 mr-2 min-h-10 min-w-20 overflow-visible p-2 relative text-left break-words`}
              >
                <span className="ml-2">
                  {size?.ProductSize?.product_size_name}
                </span>
                {size?.stock > 0 &&
                  currentVarient?.ProductSize?.product_size_id ===
                    size?.product_size_id && (
                    <>
                      <div className="absolute bottom-0 right-0 size-[15px] overflow-hidden">
                        <IoCheckmarkDone />
                      </div>
                    </>
                  )}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 justify-end items-center">
        <Button
          onClick={() => {
            setState({ type: "openPopover", payload: false });
          }}
        >
          TRỞ LẠI
        </Button>
        <Button
          onClick={() => {
            if (
              currentVarient?.product_varients_id !==
              item?.ProductVarient?.product_varients_id
            ) {
              handleUpdateVarient();
            } else {
              setState({ type: "openPopover", payload: false });
            }
          }}
        >
          XÁC NHẬN
        </Button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-12 gap-3  ">
      <div className="col-span-1 items-center flex justify-center">
        <Checkbox className="checkbox-cart" />
      </div>

      <div className="col-span-2 items-center flex justify-center">
        <img
          loading="lazy"
          onClick={() =>
            (window.location.href = `/product-details/${item?.ProductVarient?.Product?.product_id}`)
          }
          className="size-24 cursor-pointer"
          src={
            item?.ProductVarient?.ProductClassify !== null
              ? item?.ProductVarient?.ProductClassify?.thumbnail
              : item?.ProductVarient?.Product?.thumbnail
          }
        />
      </div>
      <div className="col-span-9 relative">
        <div className="flex flex-col gap-2">
          <a
            href={`/product-details/${item?.ProductVarient?.Product?.product_id}`}
            className="text-base font-garibato font-semibold hover:text-primary text-ellipsis line-clamp-1"
            title={item?.ProductVarient?.Product?.product_name}
          >
            {item?.ProductVarient?.Product?.product_name}
          </a>
          {item?.ProductVarient?.ProductClassify !== null && (
            <Popover
              placement="bottom"
              title={text}
              content={content}
              open={openPopover}
              onOpenChange={handleOpenChange}
              trigger={["click"]}
            >
              <span className="w-fit cursor-pointer flex gap-2 items-center">
                Phân loại hàng:{" "}
                {item?.ProductVarient?.ProductClassify?.product_classify_name},{" "}
                {item?.ProductVarient?.ProductSize &&
                  item?.ProductVarient?.ProductSize?.product_size_name}{" "}
                <DownOutlined />
              </span>
            </Popover>
          )}
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="flex justify-between ">
            <div className="flex gap-2">
              <span className="flex text-lg text-primary items-center font-garibato font-bold">
                <sup>₫</sup>
                {item?.price?.toLocaleString("vi-VN")}
              </span>
              {item?.ProductVarient?.sale_percents > 0 && (
                <span className="flex items-center text-slate-400 line-through font-garibato italic">
                  <sup>₫</sup>
                  {(
                    item?.quantity * item?.ProductVarient?.price
                  ).toLocaleString("vi-VN")}
                </span>
              )}
            </div>

            <div className="flex gap-4">
              <InputNumber
                prefix="Sl: "
                min={0}
                max={item?.ProductVarient?.stock}
                defaultValue={item?.quantity}
                value={item?.quantity}
                onChange={handleUpdateQuantity}
              />
              <Button
                className="border-0 hover:bg-secondary"
                shape="circle"
                icon={<SearchOutlined />}
              />
              <Button
                className="border-0 hover:bg-secondary text-primary"
                shape="circle"
                icon={<FaRegTrashAlt />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
