import React, { useState, useEffect, useContext, useRef } from "react";
import { Table, Button, Popconfirm, Row, Col, Upload, message, Form, Input } from "antd";
import { PlusOutlined, UploadOutlined, DeleteFilled } from '@ant-design/icons';
import { ExcelRenderer } from "react-excel-renderer";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
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
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: `${title} is required.` }]}>
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const ExcelPage = () => {
    const [cols, setCols] = useState([]);
    const [rows, setRows] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [columns, setColumns] = useState([
        { title: "NAME", dataIndex: "name", editable: true },
        { title: "AGE", dataIndex: "age", editable: true },
        { title: "GENDER", dataIndex: "gender", editable: true },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) =>
                rows.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <DeleteFilled style={{ color: "red", fontSize: "20px" }} />
                    </Popconfirm>
                ) : null
        }
    ]);

    const { id } = useParams(); // useParams to get route parameters

    useEffect(() => {
        if (id) {
            fetchAndVisualizeFile(id);
        }
    }, [id]);

    const handleSave = (row) => {
        const newData = [...rows];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setRows(newData);
    };

    const fileHandler = (file) => {
        let fileObj = file;
        if (!fileObj) {
            setErrorMessage("No file uploaded!");
            return false;
        }
        if (
            !(
                fileObj.type === "application/vnd.ms-excel" ||
                fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            setErrorMessage("Unknown file format. Only Excel files are uploaded!");
            return false;
        }
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                let newRows = [];
                resp.rows.slice(1).forEach((row, index) => {
                    if (row && row !== "undefined") {
                        newRows.push({ key: index, name: row[0], age: row[1], gender: row[2] });
                    }
                });
                if (newRows.length === 0) {
                    setErrorMessage("No data found in file!");
                    return false;
                } else {
                    setCols(resp.cols);
                    setRows(newRows);
                    setErrorMessage(null);
                }
            }
        });
        return false;
    };

    const fetchAndVisualizeFile = async (fileId) => {
        try {
            const response = await fetch(`https://localhost:44357/api/students/get/roadmap/${fileId}`);
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            let newRows = [];
            json.slice(1).forEach((row, index) => {
                if (row && row !== "undefined") {
                    newRows.push({ key: index, name: row[0], age: row[1], gender: row[2] });
                }
            });
            setCols(sheet);
            setRows(newRows);
            setErrorMessage(null);
        } catch (error) {
            console.error("Error visualizing the file", error);
            message.error("Failed to fetch or parse the Excel file");
        }
    };

    const handleSubmit = async () => {
        console.log("submitting: ", rows);
        // submit to API
        // if successful, banigate and clear the data
        // setRows([]);
    };

    const handleDelete = (key) => {
        const newRows = rows.filter((item) => item.key !== key);
        setRows(newRows);
    };

    const handleAdd = () => {
        const newData = { key: rows.length, name: "User's name", age: "22", gender: "Female" };
        setRows([newData, ...rows]);
    };

    const components = { body: { row: EditableRow, cell: EditableCell } };
    const tableColumns = columns.map((col) => {
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
                handleSave: handleSave
            })
        };
    });

    return (
        <>
            <h1>Importing Excel Component</h1>
            <Row gutter={16}>
                <Col
                    span={8}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "5%"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="page-title">Upload User Data</div>
                    </div>
                </Col>
                <Col span={8}>
                    <a
                        href="https://res.cloudinary.com/bryta/raw/upload/v1562751445/Sample_Excel_Sheet_muxx6s.xlsx"
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                    >
                        Sample excel sheet
                    </a>
                </Col>
                <Col
                    span={8}
                    align="right"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    {rows.length > 0 && (
                        <>
                            <Button onClick={handleAdd} size="large" type="info" style={{ marginBottom: 16 }}>
                                <PlusOutlined /> Add a row
                            </Button>{" "}
                            <Button onClick={handleSubmit} size="large" type="primary" style={{ marginBottom: 16, marginLeft: 10 }}>
                                Submit Data
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
            <div>
                <Upload name="file" beforeUpload={fileHandler} onRemove={() => setRows([])} multiple={false}>
                    <Button icon={<UploadOutlined />}>
                        Click to Upload Excel File
                    </Button>
                </Upload>
            </div>
            <div style={{ marginTop: 20 }}>
                <Table components={components} rowClassName={() => "editable-row"} dataSource={rows} columns={tableColumns} />
            </div>
            <div>
                <Button onClick={() => fetchAndVisualizeFile(id)}>Fetch and Visualize File from API</Button>
            </div>
        </>
    );
};

export default ExcelPage;
