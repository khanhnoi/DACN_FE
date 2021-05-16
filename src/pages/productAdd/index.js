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
import { createProductApi, getProductApi } from "../../apis/productApi";
import {
  NO_DATA,
  NO_DATA_NUMBER,
  desc,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILD,
} from "../../contanst";
import { useHistory } from "react-router";

const { Option } = Select;
const { TextArea } = Input;
const uploadButton = UploadButton;

const ProductAdd = (props) => {
  // const product = useSelector((state) => state.products?.detailProduct);
  const categorys = useSelector((state) => state.products?.categorys);
  const history = useHistory();

  const [product, setProduct] = useState(null);
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
    console.log(file);
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
    const { confirm } = Modal;
    return new Promise((resolve, reject) => {
      confirm({
        title: "Bạn muốn xoá ảnh này ?",
        onOk: () => {
          resolve(true);
          // <!---- onRemoveFunctionality here ---->
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

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCreateProduct = (resquest) => {
    console.log({ resquest });
    createProductApi(resquest)
      .then((res) => res.data)
      .then((res) => {
        if (res.data) {
          // Display
          notification["success"]({
            message: CREATE_PRODUCT_SUCCESS,
            duration: 3,
          });

          history.push("/products");
        }
      })
      .catch((error) => {
        // Display
        notification["error"]({
          message: CREATE_PRODUCT_FAILD,
          duration: 3,
        });
      });
  };

  const onFinish = (values) => {
    console.log("onFinish");
    console.log({ values });
    const {
      name,
      amount,
      size,
      price_buy,
      price_sell,
      catId,
      inputDay,
    } = values;
    const resquest = {
      name,
      amount,
      size,
      price_buy,
      price_sell,
      catId,
      inputDay,
    };
    handleCreateProduct(resquest);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    // fetchFakeAPI();
    async function fetch() {
      await dispatch(fetchCategorysProduct());
      // await dispatch(fetchDetailProduct(id));
      await getProductApi(id).then((res) => setProduct(res.data.data));
    }
    fetch();
  }, [dispatch, id]);

  useEffect(() => {}, [categorys]);
  console.log({ product });
  return (
    <>
      <div style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
        <Row>
          <Col span="24">
            <h1>Thêm Sản Phẩm</h1>
          </Col>
          <Col span={17}>
            <Form
              className="register-form"
              // onFinish={handleSubmit}
              initialValues={{
                name: product?.name,
                description: product?.description,
                image: product?.image,
                media: product?.media,
                // price:
                //   product?.price ||
                //   product?.price_sell ||
                //   product?.price_buy ||
                //   NO_DATA_NUMBER,
                price_buy: product?.price_buy,
                price_sell: product?.price_sell,
                rated: product?.rated,
                size: product?.size,
                status: product?.status,
                catId: product?.catId,
                number: product?.number,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
            >
              <Form.Item label="Name" name="name">
                <Input placeholder="Nhập tên" />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <TextArea rows={4} placeholder="Nhập địa chỉ" />
              </Form.Item>

              {/* <Form.Item label="Price" name="price">
                  <Input type="number" placeholder="Nhập giá" />
                </Form.Item> */}

              <Form.Item label="Price Buy" name="price_buy">
                <Input type="number" placeholder="Nhập giá mua" />
              </Form.Item>

              <Form.Item label="Price Sell" name="price_sell">
                <Input type="number" placeholder="Nhập giá bán" />
              </Form.Item>

              <Form.Item label="Size" name="size">
                <Input type="number" placeholder="Nhập size" />
              </Form.Item>

              <Form.Item label="Number" name="number">
                <Input
                  style={{ width: "150px" }}
                  type="number"
                  placeholder="Nhập số số lượng"
                />
              </Form.Item>

              <Form.Item label="Rated" name="rated">
                <Rate tooltips={desc} />
                {/* <Rate value={0} disabled /> */}
              </Form.Item>

              <Form.Item label="Status" name="status">
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
              </Form.Item>

              <Form.Item label="Category" name="catId">
                <Input.Group compact>
                  <Select
                    defaultValue={
                      categorys?.find(
                        (category) => category.id === product?.catId
                      )?.name
                    }
                    style={{ width: "150px" }}
                  >
                    {categorys?.map((category, index) => (
                      <Option key={category.id} value={category.name}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Input.Group>
              </Form.Item>

              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType={"picture-card" || "picture" || "text"}
                fileList={product?.media || [] || fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={onGalleryFileRemove}
              >
                {fileList.length >= 8 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>

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
                      Lưu
                    </Button>
                    <Button
                      // key="2"
                      className="btn-default"
                      onClick={() => props.history.push("/products")}
                    >
                      Trở về
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
  return null;
};

export default ProductAdd;
