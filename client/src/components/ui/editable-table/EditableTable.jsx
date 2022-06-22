import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { EditableRow } from './EditableRow';
import { EditableCell } from './EditableCell';
import './editable-table.css';

export const EditableContext = createContext(null);

export const EditableTable = ({ dataSource, cols, summary, saveTableData, pagination, expanded = false }) => {
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    saveTableData(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = cols.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  let summaryRender = null;
  if (summary) {
    summaryRender = (pageData) => summary(pageData);
  }
  const renderExpander = expanded
    ? {
        rowExpandable: (record) => record.details?.length > 1,
        expandedRowRender: /*eslint-disable-line*/ (record) => <p>{record.replacement}</p>,
        expandRowByClick: true,
      }
    : {};

  return (
    <div className='--editable-info__container'>
      <Table
        className='--editable-info__table'
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={columns}
        size='small'
        bordered={true}
        pagination={pagination}
        scroll={{ x: 'fit-content' }}
        summary={summaryRender}
        {...renderExpander}
      />
    </div>
  );
};

EditableTable.propTypes = {
  cols: PropTypes.array,
  dataSource: PropTypes.array,
  summary: PropTypes.func,
  saveTableData: PropTypes.func,
  expanded: PropTypes.bool,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};
