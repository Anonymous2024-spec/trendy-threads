import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

export default function ModalCategoryForm({
  open,
  onCancel,
  onSubmit,
  initialData,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (initialData) {
          values.id = initialData.id;
        }
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title={initialData ? "Edit Category" : "Add Category"}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText={initialData ? "Update" : "Add"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please enter a category name" }]}
        >
          <Input placeholder="e.g. Dresses" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Describe the category" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
