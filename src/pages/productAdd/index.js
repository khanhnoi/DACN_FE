import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Select,
  Button,
  Input,
  Form,
  Space,
  notification,
  Rate,
  Upload,
  Modal,
  Image,
} from "antd";
import UploadButton from "../../components/common/UploadButton";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getFakeDataProduct,
  getFakeDataStatusProduct,
} from "../../apis/fakeApis";
import {
  fetchDetailProduct,
  fetchCategorysProduct,
} from "../../actions/productAction";
import {
  updateProductApi,
  createProductApi,
  getListCategoryApi,
} from "../../apis/productApi";
import {
  NO_DATA,
  NO_DATA_NUMBER,
  desc,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILD,
  WARNING_INPUT,
  WARNING_DELE_IMAGE,
} from "../../contanst";
import FileBase from "react-file-base64";
import Loading from "../../components/Loading";
import { useHistory } from "react-router";

const { Option } = Select;
const { TextArea } = Input;
const uploadButton = UploadButton;

const ProductAdd = (props) => {
  // const product = useSelector((state) => state.products?.detailProduct);
  const categorys = useSelector((state) => state.products?.categorys);

  const [imageBase64, setImageBase64] = useState("");
  // const [imageBase64, setImageBase64] = useState(null);
  const history = useHistory();

  const [statusProduct, setStatusProduct] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "http://khanhnoi.mobie.in/img/khanh-noi.jpg",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "http://khanhnoi.mobie.in/img/khanh-noi.jpg",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "http://khanhnoi.mobie.in/img/khanh-noi.jpg",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "http://khanhnoi.mobie.in/img/khanh-noi.jpg",
    },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error',
    // },
  ]);
  const dispatch = useDispatch();

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    console.log({ file });
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  //upload img
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    console.log("newfileList");
    console.log(fileList);
    // setProduct({ ...product, media: fileList });
  };

  const onGalleryFileRemove = (file) => {
    // console.log({ file });
    if (file.status === NO_DATA) return;
    const { confirm } = Modal;
    return new Promise((resolve, reject) => {
      confirm({
        title: WARNING_DELE_IMAGE,
        onOk: () => {
          resolve(true);
          // <!---- onRemoveFunctionality here ---->
          setImageBase64("");
        },
        onCancel: () => {
          reject(true);
        },
      });
    });
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const onDoneImageBase64 = ({ base64 }) => setImageBase64(base64);

  const handleCreateProduct = (resquest) => {
    console.log({ resquest });
    if (
      resquest.name == "" ||
      resquest.amount == "" ||
      resquest.catId == ("" || 0) ||
      resquest.price_buy == "" ||
      resquest.price_sell == "" ||
      resquest.size == ""
    ) {
      notification["warning"]({
        message: WARNING_INPUT,
        duration: 3,
      });
      return;
    }
    createProductApi(resquest)
      .then((res) => res.data)
      .then((res) => {
        if (res.data) {
          // Display
          notification["success"]({
            message: CREATE_PRODUCT_SUCCESS,
            duration: 3,
          });
          console.log("OK");
          history.push("/products");
        } else {
          notification["error"]({
            message: CREATE_PRODUCT_FAILD,
            duration: 3,
          });
        }
      })
      .catch((error) => {
        // Display
        console.log(error);
        notification["error"]({
          message: error.message,
          duration: 3,
        });
      });
  };

  const onFinish = (values) => {
    console.log("onFinish");
    console.log({ values });
    const { name, amount, size, price_buy, price_sell, catId, inputDay } =
      values;
    const resquest = {
      name,
      amount,
      size,
      price_buy,
      price_sell,
      catId,
      inputDay: inputDay || "",
      image: imageBase64,
    };
    handleCreateProduct(resquest);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // fetchFakeAPI();
    async function fetch() {
      // console.log({ categorys });
      if (!categorys) {
        await dispatch(fetchCategorysProduct());
      }
      // await dispatch(fetchDetailProduct(id));
      // await getProductApi(id).then((res) => {
      //   setProduct(res.data.data);
      // });
    }
    fetch();
  }, [dispatch]);

  useEffect(() => {}, [categorys]);

  // if (product)
  return (
    <>
      <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
        <Row>
          <Col span="24">
            <h1>Add Product</h1>
          </Col>
          <Col span={17}>
            <Form
              className="register-form"
              // onFinish={handleSubmit}
              initialValues={{
                name: "",
                // description: product?.description || NO_DATA,
                image: "",
                amount: "",
                // media: product?.media,
                // price:
                //   product?.price ||
                //   product?.price_sell ||
                //   product?.price_buy ||
                //   NO_DATA_NUMBER,
                price_buy: "",
                price_sell: "",
                // rated: product?.rated || NO_DATA_NUMBER,
                size: "",
                // status: product?.status || NO_DATA,
                catId: "",
                number: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
            >
              <Form.Item
                label="Name"
                name="name"
                // rules={[{ required: true, message: "Please input Name" }]}
              >
                <Input placeholder={" " || "Nhập tên"} />
              </Form.Item>

              {/* <Form.Item label="Description" name="description">
                  <TextArea rows={4} placeholder="Nhập địa chỉ" />
                </Form.Item> */}

              {/* <Form.Item label="Price" name="price">
                  <Input type="number" placeholder="Nhập giá" />
                </Form.Item> */}

              <Form.Item
                label="Price Buy"
                name="price_buy"
                // rules={[{ required: true, message: "Please input Price Buy" }]}
              >
                <Input type="number" placeholder={" " || "Nhập giá mua"} />
              </Form.Item>

              <Form.Item
                label="Price Sell"
                name="price_sell"
                // rules={[{ required: true, message: "Please input Price Sell" }]}
              >
                <Input type="number" placeholder={" " || "Nhập giá bán"} />
              </Form.Item>

              <Form.Item
                label="Size"
                name="size"
                // rules={[{ required: true, message: "Please input Size" }]}
              >
                <Input type="number" placeholder={" " || "Nhập size"} />
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                // rules={[{ required: true, message: "Please input Amount" }]}
              >
                <Input
                  style={{ width: "150px" }}
                  type="number"
                  placeholder={" " || "Nhập số số lượng"}
                />
              </Form.Item>

              {/* <Form.Item label="Rated" name="rated">
                  <Rate tooltips={desc} />
                  <Rate value={0} disabled />
                </Form.Item> */}

              {/* <Form.Item label="Status" name="status">
                  <Input.Group compact>
                    <Select
                      defaultValue={product?.status}
                      style={{ width: "150px" }}
                    >
                      {statusProduct.map((status, index) => (
                        <Option key={index} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Input.Group>
                </Form.Item> */}

              <Form.Item
                label="Category"
                name="catId"
                // rules={[{ required: true, message: "Please input Name" }]}
              >
                {/* <Input.Group compact> */}
                <Select
                  // defaultValue={
                  //   categorys?.find(
                  //     (category) => category.id === product?.catId
                  //   )?.name
                  // }
                  style={{ width: "150px" }}
                >
                  {categorys?.map((category, index) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
                {/* </Input.Group> */}
              </Form.Item>

              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType={"picture-card" || "picture" || "text"}
                fileList={[
                  {
                    uid: "create",
                    name: "Image",
                    status: imageBase64 != "" ? "done" : NO_DATA,
                    url: imageBase64,
                  },
                ]}
                onPreview={handlePreview}
                // onChange={handleChange}
                onRemove={onGalleryFileRemove}
              >
                {/* {[{ name: "image.png" }].length >= 0 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )} */}
              </Upload>

              {/* <Image
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                /> */}

              <FileBase
                type="file"
                multiple={false}
                onDone={onDoneImageBase64}
              ></FileBase>

              <Form.Item>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "30px",
                    width: "100%",
                  }}
                >
                  <Space size={10}>
                    <Button
                      // key="1"
                      className="btn-default"
                      type="primary"
                      // onClick={handleSaveProduct}
                      htmlType="submit"
                    >
                      Add
                    </Button>
                    <Button
                      // key="2"
                      className="btn-default"
                      onClick={() => props.history.push("/products")}
                    >
                      Back
                    </Button>
                  </Space>
                </div>
              </Form.Item>
            </Form>
          </Col>

          {/* <Col
              span={7}
              style={{ padding: "20px", textAlign: "center" }}
            ></Col> */}

          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Row>
      </div>
    </>
  );
  return <Loading />;
};

export default ProductAdd;
