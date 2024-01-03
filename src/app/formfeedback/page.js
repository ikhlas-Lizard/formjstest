"use client";
import { useEffect, useState } from "react";
import { Form } from "@bpmn-io/form-js-viewer";
import {
  Drawer,
  Input,
  Modal,
  Select,
  Form as FormAntd,
  Button,
  Space,
  Empty,
} from "antd";

const schema = {
  schemaVersion: 1,
  exporter: {
    name: "form-js",
    version: "0.1.0",
  },
  components: [
    {
      type: "uploadFile",
      key: "uploadFile",
    },
  ],
  type: "default",
  components: [
    {
      key: "valueToClaim",
      label: "Value",
      type: "textfield",
      validate: {
        required: true,
      },
    },
    {
      key: "debtor",
      label: "Debtor",
      type: "textfield",
      validate: {
        required: true,
      },
    },
    {
      key: "creditor",
      label: "Creditor",
      type: "textfield",
      validate: {
        required: true,
      },
    },
    {
      key: "submit",
      type: "button",
      action: "submit",
      label: "Submit",
    },
  ],
};

const data = {
  creditor: "John Doe",
  debtor: "John American",
  valueToClaim: "100",
};

const FormFeedbackPrototype = ({}) => {
  const [formViewer, setformViewer] = useState(null);
  const [formData, setFormData] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [feedbackJson, setFeedbackJson] = useState([]);

  useEffect(() => {
    const formViewer = new Form({
      container: document.querySelector("#form-viewer"),
    });

    formViewer.importSchema(schema, data);

    formViewer.on("submit", (event) => {
      const { data } = event;
      console.log(data, "data");
    });

    formViewer.on("changed", (event) => {
      const { data } = event;
      setFormData(data);
    });

    // Cleanup function to dispose the editor when component unmounts
    return () => {
      formViewer?.destroy();
    };
  }, []);

  const addFeedback = (componentKey, feedback) => {
    setFeedbackJson([
      ...feedbackJson,
      {
        key: componentKey,
        feedback: feedback,
      },
    ]);
  };

  useEffect(() => {
    // remove feedbackJson if formdata value is changed
    // find what is changed comapre with original data
    const changedData = Object.keys(formData).filter(
      (key) => formData[key] !== data[key]
    );

    const newFeedbackJson = feedbackJson.filter(
      (feedback) => !changedData.includes(feedback.key)
    );

    setFeedbackJson(newFeedbackJson);
  }, [formData]);

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        ></link>

        <link
          href="https://unpkg.com/@bpmn-io/form-js/dist/assets/form-js.css"
          rel="stylesheet"
        ></link>
      </head>
      <div>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Feedback"
        >
          {feedbackJson.length === 0 ? (
            <Empty description={<span>No feedback yet</span>} />
          ) : (
            <>
              <p>Change the value of the field to see the feedback disappear</p>
              {feedbackJson.map((feedback) => {
                return (
                  <div
                    style={{
                      padding: "10px",
                      border: "1px solid black",
                      marginBottom: "10px",
                    }}
                  >
                    <h3>{feedback.key}</h3>
                    <p>{feedback.feedback}</p>
                  </div>
                );
              })}
            </>
          )}
        </Drawer>
        <Modal
          title="Add a new feedback"
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          //   disable buttons
          footer={null}
        >
          <FormAntd
            onFinish={(values) => {
              addFeedback(values.component, values.feedback);
              setModalOpen(false);
              console.log(values);
            }}
          >
            <FormAntd.Item label="Component" name="component">
              <Select
                options={schema.components
                  .filter((component) => component.type !== "button")
                  .map((component) => {
                    return {
                      label: component.label,
                      value: component.key,
                    };
                  })}
                style={{
                  width: "100%",
                }}
              />
            </FormAntd.Item>
            <FormAntd.Item
              label="Feedback"
              name="feedback"
              rules={[
                {
                  required: true,
                  message: "Please input your feedback!",
                },
              ]}
            >
              <Input placeholder="feedback" />
            </FormAntd.Item>
            <FormAntd.Item
              style={{
                textAlign: "right",
              }}
            >
              <Button htmlType="submit">Add</Button>
            </FormAntd.Item>
          </FormAntd>
        </Modal>
        <div
          style={{
            padding: "50px",
          }}
          id="form-viewer"
        ></div>
        <div
          style={{
            marginLeft: "100px",
          }}
        >
          <Space>
            <Button onClick={() => setModalOpen(true)}>Add feedback</Button>
            <Button
              onClick={() => {
                setDrawerOpen(true);
                console.log(feedbackJson, "feedbackJson");
              }}
            >
              Open feedback drawer
            </Button>
          </Space>
          <p>
            Start by adding feedback to the form. Then change the value of the
            form and see how the feedback is removed. Check the feedback drawer
            to see the feedback.
          </p>
        </div>
      </div>
    </>
  );
};

export default FormFeedbackPrototype;
