import { Modal } from "antd";
import React from "react";
import AddProductForm from "./AddProductForm";

export default function ModalForm({ open, onCancel }) {
  return (
    <Modal
      title="Add Product"
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={() => form.submit()}
    >
      <AddProductForm />
    </Modal>
  );
}
