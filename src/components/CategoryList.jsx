import React, { useState } from "react";
import { Table, Button, Space, Typography, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { categoriesData } from "../data/categories";
import ModalCategoryForm from "./ModalCategoryForm";

const { Title } = Typography;

export default function CategoryList() {
  const [categories, setCategories] = useState(categoriesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    const filtered = categories.filter((category) => category.id !== record.id);
    setCategories(filtered);
    console.log("Deleted:", record);
  };

  const handleModalSubmit = (category) => {
    if (editingCategory) {
      // Update existing
      const updated = categories.map((cat) =>
        cat.id === category.id ? category : cat
      );
      setCategories(updated);
      message.success("Category updated");
    } else {
      // Add new
      const newCategory = {
        ...category,
        id: Date.now(),
      };
      setCategories([...categories, newCategory]);
      message.success("Category added");
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
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
        <Title level={4}>Product Categories</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Category
        </Button>
      </div>

      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <ModalCategoryForm
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingCategory}
      />
    </div>
  );
}
