import { Form, Input, Select, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function AddProductForm({
  onOk,
  onSubmit,
  initialValues,
  form, // ✅ use passed form
  isEditing = false,
}) {
  const onFinish = (values) => {
    const formData = {
      ...values,
      image:
        values.image instanceof File
          ? URL.createObjectURL(values.image)
          : initialValues?.image,
    };

    console.log("📝 Form submitted:", formData);

    if (typeof onSubmit === "function") {
      onSubmit(formData);
    }

    onOk();
    form.resetFields();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList?.[0]?.originFileObj;
  };

  return (
    <Form
      {...layout}
      form={form}
      name="add-product-form"
      onFinish={onFinish}
      initialValues={initialValues}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Enter product name" }]}
      >
        <Input placeholder="e.g. Stylish Carpet" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Enter price" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Select a category" }]}
      >
        <Select allowClear placeholder="Select category">
          <Option value="carpet">Carpet</Option>
          <Option value="shoes">Shoes</Option>
          <Option value="jeans">Jeans</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="stock"
        label="Stock"
        rules={[{ required: true, message: "Enter stock quantity" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image"
        valuePropName="file"
        getValueFromEvent={normFile}
        rules={[
          {
            required: !isEditing,
            message: "Please upload an image!",
          },
        ]}
      >
        <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
      </Form.Item>
    </Form>
  );
}
