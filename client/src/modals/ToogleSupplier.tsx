import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Typography,
} from "antd";
import handleApi from "apis/handleApi";
import { colors } from "constants/colors";
import { User } from "iconsax-react";
import { replaceName } from "utils/replaceName";
import { ISupplier } from "types/Supplier";

const { Paragraph } = Typography;
interface IToogleSupplier {
  visible: boolean;
  onClose: () => void;
  onAddNew: (val: ISupplier) => void;
  supplier?: ISupplier;
}

const ToogleSupplier = (props: IToogleSupplier) => {
  const { visible, onClose, onAddNew, supplier } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isTaking, setIsTaking] = useState<boolean>();
  const [file, setFile] = useState<any>();
  const inpRef = useRef<HTMLInputElement>(null);
  const [form] = Form.useForm();
  const addNewSupplier = async (values: any) => {
    setIsLoading(true);
    const data: any = {};
    const api = "/supplier/add-new";
    for (const i in values) {
      data[i] = values[i] ?? "";
    }

    data.price = values.price ? parseInt(values.price) : 0;
    data.isTaking = isTaking ? 1 : 0;
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const res: any = await handleApi("/api/upload-image", formData, "post");

      data.photoUrl = res.url;
    }
    data.slug = replaceName(values.name);
    try {
      const res: any = await handleApi(api, data, "post");
      message.success(res.message);
      onAddNew(res.data);
      handleClose();
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      closable={!isLoading}
      open={visible}
      onOk={() => form.submit()}
      onCancel={handleClose}
      title="Add Supplier"
      okText="Add Supplier"
      cancelText="Discal"
    >
      <label htmlFor="inpFile" className="p-2 mb-3 d-flex gap-3">
        {file ? (
          <Avatar size={100} src={URL.createObjectURL(file)} />
        ) : (
          <Avatar
            size={100}
            style={{ backgroundColor: "white", border: "1px dashed #e0e0e0" }}
          >
            <User size={80} color={colors.gray600} />
          </Avatar>
        )}

        <div className="ml-3">
          <Paragraph className="text-muted m-0">Drag image here</Paragraph>
          <Paragraph className="text-muted mb-2">Or</Paragraph>
          <Button onClick={() => inpRef.current?.click()} type="link">
            Browse image
          </Button>
        </div>
      </label>
      <div className="d-none">
        <input
          ref={inpRef}
          accept="image/*"
          type="file"
          name=""
          id=""
          onChange={(val: any) => setFile(val.target.files[0])}
        />
      </div>

      <Form
        disabled={isLoading}
        onFinish={addNewSupplier}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        size="large"
        form={form}
      >
        <Form.Item
          name={"name"}
          rules={[
            {
              required: true,
              message: "Enter supplier name",
            },
          ]}
          label="Supplier name"
        >
          <Input placeholder="Enter supplier name" allowClear />
        </Form.Item>
        <Form.Item name={"product"} label="Product">
          <Input placeholder="Enter product" allowClear />
        </Form.Item>
        <Form.Item name={"categories"} label="Category">
          <Select options={[]} placeholder="Select product category" />
        </Form.Item>
        <Form.Item name={"price"} label="Buying Price">
          <Input type="number" placeholder="Enter buying price" allowClear />
        </Form.Item>
        <Form.Item name={"contact"} label="Contact number">
          <Input
            type="number"
            placeholder="Enter supplier contact number"
            allowClear
          />
        </Form.Item>
        <Form.Item label="Type">
          <div className="mb-2">
            <Button
              size="middle"
              onClick={() => setIsTaking(false)}
              type={isTaking === false ? "primary" : "default"}
            >
              {" "}
              Not taking return
            </Button>
          </div>
          <Button
            size="middle"
            onClick={() => setIsTaking(true)}
            type={isTaking ? "primary" : "default"}
          >
            {" "}
            Taking return
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ToogleSupplier;
