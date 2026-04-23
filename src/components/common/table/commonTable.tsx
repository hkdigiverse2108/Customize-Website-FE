import { CommonTableProps } from "@/type";
import { Table } from "antd";
import { useMemo } from "react";

export const CommonTable = <T extends object>({ loading = false, dataSource, columns = [], pagination = { current: 1, pageSize: 10 }, rowKey = "_id", bordered = false, size = "middle", scroll, ...rest }: CommonTableProps<T>) => {
  const fixedColumns = useMemo(() => {
    const current = pagination?.current ?? 1;
    const pageSize = pagination?.pageSize ?? 10;

    return [
      {
        title: "Sr No.",
        key: "index",
        width: 80,
        fixed: "left" as const,
        render: (_, __, index: number) => (current - 1) * pageSize + index + 1,
      },
      ...(columns || []),
    ];
  }, [columns, pagination]);

  return (
    <Table<T> //
      loading={loading}
      dataSource={dataSource}
      columns={fixedColumns}
      pagination={{
        ...pagination, //
        showSizeChanger: true,
        size: "middle",
        showTotal: (total) => `Total ${total} items`,
      }}
      rowKey={rowKey}
      bordered={bordered}
      size={size}
      scroll={scroll || { x: "max-content" }}
      {...rest}
    />
  );
};
