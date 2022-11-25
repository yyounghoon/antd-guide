import React, { useEffect, useState } from 'react';
import { Button, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: '김길동',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: '나길동',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: '나길동',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

function CustomTable() {
  const [selectRows, setSelectRows] = useState<DataType[]>([]);
  const [selectCategory, setSelectCategory] = useState('김길동');
  const [tempData, setTempData] = useState<DataType[]>(data);

  // 특정 셀 클릭시
  const handleCellClick = (record: DataType) => {
    console.log('record', record);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, record) => (
        <div onClick={() => handleCellClick(record)}>{text}</div>
      ),
      sorter: (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1; // 오름차순 정렬
        return 0;
      },
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: false,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const handleSelectCategory = (value: string) => {
    console.log('카테고리 변경');
    console.log('value', value);
    // 테이블 데이터 필터 처리
    setTempData(handleData(value));
  };

  const handleData = (value: string) => {
    setSelectCategory(value);

    if (value === 'all') {
      return data;
    }

    return data.filter((data) => data.name === value);
  };

  const handleClick = () => {
    alert(JSON.stringify(selectRows));
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectRows(selectedRows);
    },
  };

  useEffect(() => {}, [selectCategory]);

  return (
    <div>
      <Select
        defaultValue="김길동"
        style={{ width: 120 }}
        onChange={handleSelectCategory}
        options={[
          {
            value: 'all',
            label: 'all',
          },
          {
            value: '김길동',
            label: '김길동',
          },
          {
            value: '나길동',
            label: '나길동',
          },
        ]}
      />
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={tempData}
        pagination={{
          pageSize: 2,
        }}
      />
      <Button onClick={() => handleClick()}>선택된 유저 확인 버튼</Button>
    </div>
  );
}

export default CustomTable;
