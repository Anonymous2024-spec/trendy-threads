import { Modal } from "antd";
import AddProductForm from "./AddProductForm";

export default function ModalForm({
  open,
  onOk,
  onCancel,
  initialValues,
  form,
}) {
  const handleFormSubmit = (formData) => {
    onOk(formData); // ✅ This will now pass data to ProductList
  };

  return (
    <Modal
      title={initialValues ? "Edit Product" : "Add Product"}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <AddProductForm
        form={form}
        onSubmit={handleFormSubmit} // ✅ Hook this to pass data
        onOk={onCancel} // closes modal and resets form
        initialValues={initialValues}
      />
    </Modal>
  );
}
