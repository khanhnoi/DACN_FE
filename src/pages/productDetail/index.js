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
  getProductApi,
  getListCategoryApi,
} from "../../apis/productApi";
import {
  NO_DATA,
  NO_DATA_NUMBER,
  desc,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILD,
  WARNING_INPUT,
  WARNING_DELE_IMAGE,
} from "../../contanst";
import FileBase from "react-file-base64";
import Loading from "../../components/Loading";

const { Option } = Select;
const { TextArea } = Input;
const uploadButton = UploadButton;

const ProductDetail = (props) => {
  // const product = useSelector((state) => state.products?.detailProduct);
  // const categorys = useSelector((state) => state.products?.categorys);

  const [product, setProduct] = useState(null);
  const [categorys, setCategorys] = useState(null);
  // const [imageBase64, setImageBase64] = useState(null);

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
  const id = props.match.params.id;

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
          setProduct({ ...product, image: "" });
        },
        onCancel: () => {
          reject(true);
        },
      });
    });
  };

  // const  onGalleryFileRemove2 = (file)=>{
  //   return new Promise((resolve, reject) => {
  //    confirm({
  //      title: 'are you sure to remove this file?',
  //        onOk: () => {
  //          resolve(true)
  //        },
  //    })
  //      const index = this.state.galleryFile.indexOf(file);
  //      const deletedGalleryFiles = this.state.deletedGalleryFiles;
  //      deletedGalleryFiles.push(this.state.galleryFile[index].uid);
  //      const newFileList = this.state.galleryFile.slice();
  //          newFileList.splice(index, 1);
  //              this.setState({
  //                  galleryFile:newFileList,
  //                  deletedGalleryFiles,
  //                  previewVisible:false
  //              })
  //      false
  //      })
  //  }

  const handleRemoveId = (id) => {
    if (id === "-1") {
      return null;
    } else {
      return <DeleteOutlined />;
    }
  };

  //end upload img

  // const fetchFakeAPI = async () => {
  //   const resStatusProduct = await getFakeDataStatusProduct(id);
  //   setStatusProduct(resStatusProduct);
  //   console.log("statusProduct");
  //   console.log(statusProduct);

  //   const resProductFake = await getFakeDataProduct(id);
  //   setProduct(resProductFake);
  //   console.log("resProductFake");
  //   console.log(resProductFake);
  // };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const onDoneImageBase64 = ({ base64 }) =>
    setProduct({
      ...product,
      image: base64,
    });

  const handleSaveProduct = (resquest) => {
    console.log({ resquest });

    if (
      resquest.name == "" ||
      resquest.price_buy == "" ||
      resquest.price_sell == "" ||
      resquest.amount == "" ||
      resquest.size == "" ||
      resquest.catId == ("" || 0)
    ) {
      notification["warning"]({
        message: WARNING_INPUT,
        duration: 3,
      });
      return;
    }
    // return;
    updateProductApi(resquest)
      .then((res) => res.data)
      .then((res) => {
        if (res.data) {
          // Display
          notification["success"]({
            message: UPDATE_PRODUCT_SUCCESS,
            duration: 3,
          });
          // history.push('/products');
        }
      })
      .catch((error) => {
        // Display
        notification["error"]({
          message: UPDATE_PRODUCT_FAILD,
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
      id: id,
      name,
      amount,
      size,
      price_buy,
      price_sell,
      catId,
      inputDay: inputDay || "",
      image: product.image,
    };
    handleSaveProduct(resquest);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // fetchFakeAPI();
    async function fetch() {
      // console.log({ categorys });
      // if (!categorys) {
      //   await dispatch(fetchCategorysProduct());
      // }
      // await dispatch(fetchDetailProduct(id));

      await getListCategoryApi().then((res) => {
        console.log(res?.data?.data);
        setCategorys(res?.data?.data);
      });
      await getProductApi(id).then((res) => {
        setProduct(res.data.data);
      });
    }
    fetch();
  }, [dispatch, id]);

  useEffect(() => {}, [categorys]);

  if (product)
    return (
      <>
        <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
          <Row>
            <Col span="24">
              <h1>Product ID: {product?.id || id}</h1>
            </Col>
            <Col span={17}>
              <Form
                className="register-form"
                // onFinish={handleSubmit}
                initialValues={{
                  name: product?.name || NO_DATA,
                  // description: product?.description || NO_DATA,
                  image: product?.image,
                  amount: product?.amount,
                  // media: product?.media,
                  // price:
                  //   product?.price ||
                  //   product?.price_sell ||
                  //   product?.price_buy ||
                  //   NO_DATA_NUMBER,
                  price_buy: product?.price_buy || NO_DATA_NUMBER,
                  price_sell: product?.price_sell || NO_DATA_NUMBER,
                  // rated: product?.rated || NO_DATA_NUMBER,
                  size: product?.size || NO_DATA_NUMBER,
                  // status: product?.status || NO_DATA,
                  catId: product?.catId || NO_DATA_NUMBER,
                  number: product?.number || NO_DATA_NUMBER,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
              >
                <Form.Item label="Name" name="name">
                  <Input placeholder="" />
                </Form.Item>

                {/* <Form.Item label="Description" name="description">
                  <TextArea rows={4} placeholder="Nh???p ?????a ch???" />
                </Form.Item> */}

                {/* <Form.Item label="Price" name="price">
                  <Input type="number" placeholder="Nh???p gi??" />
                </Form.Item> */}

                <Form.Item label="Price Buy" name="price_buy">
                  <Input type="number" placeholder="" />
                </Form.Item>

                <Form.Item label="Price Sell" name="price_sell">
                  <Input type="number" placeholder="" />
                </Form.Item>

                <Form.Item label="Size" name="size">
                  <Input type="number" placeholder="" />
                </Form.Item>

                <Form.Item label="Amount" name="amount">
                  <Input
                    style={{ width: "150px" }}
                    type="number"
                    placeholder=""
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

                <Form.Item label="Category" name="catId">
                  {/* <Input.Group compact> */}
                  <Select
                    defaultValue={
                      categorys?.find(
                        (category) => category.id === product?.catId
                      )?.id
                    }
                    style={{ width: "150px" }}
                  >
                    {categorys?.map((category, index) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                    {/* <Option value={1}>x1</Option>
                    <Option value={2}>x2</Option>
                    <Option value={3}>x3</Option> */}
                  </Select>
                  {/* </Input.Group> */}
                </Form.Item>

                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType={"picture-card" || "picture" || "text"}
                  fileList={[
                    {
                      uid: product.id,
                      name: product.image != "" ? "Image" : NO_DATA,
                      status: product.image != "" ? "done" : NO_DATA,
                      url: product.image,
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
                        Save
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

export default ProductDetail;
