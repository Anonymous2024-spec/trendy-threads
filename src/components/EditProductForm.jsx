import React, { useEffect } from "react";
import { Form, Input, InputNumber, Select,Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;


export default function EditProductForm({ form, initialValues }) {
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the product name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter a price" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select>
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
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) return e;
          return e?.fileList?.[0]?.originFileObj;
        }}
        rules={[{ required: true, message: "Please upload an image!" }]}
      >
        <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
}
