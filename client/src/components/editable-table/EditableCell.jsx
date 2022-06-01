import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import { EditableContext } from './EditableTable';

export const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Indique el ${title}.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          style={{ maxWidth: '100px', textAlign: 'right', padding: '0 8px' }}
          onPressEnter={save}
          onBlur={save}
          onFocus={(e) => e.target.select()}
        />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 2,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return (
    <td style={{ maxWidth: '100px', textAlign: 'right', padding: '0 8px' }} {...restProps}>
      {childNode}
    </td>
  );
};

EditableCell.propTypes = {
  title: PropTypes.string,
  editable: PropTypes.bool,
  children: PropTypes.array,
  dataIndex: PropTypes.string,
  record: PropTypes.object,
  handleSave: PropTypes.func,
};
