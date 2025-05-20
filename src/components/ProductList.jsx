import React, { useState } from "react";
import { Table, Button, Space, Typography, Form } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { productsData } from "../data/products";
import ModalForm from "./ModalForm";

const { Title } = Typography;

export default function ProductList() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState(productsData);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOk = (values) => {
    if (editingProduct) {
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? { ...product, ...values } : product
      );
      setProducts(updatedProducts); // Update the state with new product list
    } else {
      const newProduct = {
        ...values,
        id: Date.now(), // Generate a unique ID for new products
      };
      setProducts([...products, newProduct]); // Add new product to state
      console.log("New Product:", newProduct);
    }

    setIsModalOpen(false); // Close modal
    setEditingProduct(null); // Reset editing product
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    const filtered = products.filter((product) => product.id !== record.id);
    setProducts(filtered);
    console.log("Deleted:", record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (price ? `$${price.toFixed(2)}` : "$0.00"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url) => <img src={url} alt="product" width={50} height={60} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Products</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Product
        </Button>
      </div>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <ModalForm
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        initialValues={editingProduct}
        form={form}
        isEditing={!!editingProduct} // 👈 Add this line
      />
    </div>
  );
}
