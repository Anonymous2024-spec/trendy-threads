import { Modal, Form } from "antd";
import React from "react";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";

export default function ModalForm({ open, onCancel, onOk, initialValues }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onOk(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={initialValues ? "Edit Product" : "Add Product"}
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText={initialValues ? "Update" : "Add"}
    >
      {initialValues ? (
        <EditProductForm form={form} initialValues={initialValues} />
      ) : (
        <AddProductForm onOk={handleSubmit} />
      )}
    </Modal>
  );
}
