import { ColumnProps } from "antd/es/table";
import React, { useState } from "react";
import { Button, Space, Table, Typography } from "antd";
import { Sort } from "iconsax-react";
import { colors } from "constants/colors";
import { ToogleSupplier } from "modals";
import { ISupplier } from "types/Supplier";
const { Title } = Typography;
const SupplierScreen = () => {
  const [isVisibleMoadlAddNew, setIsVisibleMoadlAddNew] = useState(false);
  const colums: ColumnProps<ISupplier>[] = [];
  return (
    <div>
      <Table
        dataSource={[]}
        columns={colums}
        title={() => (
          <div className="row">
            <div className="col">
              <Title level={5}>Suppliers</Title>
            </div>
            <div className="col text-end">
              <Space>
                <Button
                  type="primary"
                  onClick={() => setIsVisibleMoadlAddNew(true)}
                >
                  Add Suppliers
                </Button>
                <Button icon={<Sort size={20} color={colors.gray600} />}>
                  Filters
                </Button>
                <Button>Dowload All</Button>
              </Space>
            </div>
            <ToogleSupplier
              visible={isVisibleMoadlAddNew}
              onClose={() => setIsVisibleMoadlAddNew(false)}
              onAddNew={(val) => console.log(val)}
            />
          </div>
        )}
      />
    </div>
  );
};

export default SupplierScreen;
