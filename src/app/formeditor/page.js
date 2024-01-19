"use client";
import { useEffect, useState } from "react";
import { FormEditor } from "@bpmn-io/form-js-editor";
import { Form } from "@bpmn-io/form-js-viewer";
import { FormField } from "@bpmn-io/form-js";

import RenderExtension from "./extension/render";
import SignatureExtension from "./extension/signature";
import { FormPlayground } from "@bpmn-io/form-js";

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
      key: "creditor",
      label: "Creditor",
      type: "textfield",
      validate: {
        // set to always error
        required: true,
      },
    },
  ],
};

const data = {
  creditor: "John Doe",
};

const FormEditorPage = ({ container }) => {
  const [formSchema, setformSchema] = useState(schema);
  const [mode, setMode] = useState("editor");
  const [formEditor, setFormEditor] = useState(null);
  const [formViewer, setformViewer] = useState(null);

  useEffect(() => {
    const formEditor = new FormEditor({
      container: document.querySelector("#form-editor"),
      additionalModules:  [SignatureExtension],
    });

    formEditor.importSchema(schema);
    setFormEditor(formEditor);

    // Cleanup function to dispose the editor when component unmounts
    return () => {
      formEditor.destroy();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const saveSchema = () => {
    const schema = formEditor.saveSchema();
    console.log(schema, "saveSchema");
    setformSchema(schema);
  };

  const loadFormViewer = (schemaData) => {
    // formViewer?.destroy(); // destroy old viewer
    const formViewer = new Form({
      container: document.querySelector("#form-viewer"),
      additionalModules: [SignatureExtension],
    });

    formViewer.importSchema(schemaData, data);

    formViewer.on("submit", (event) => {
      const { data } = event;
      console.log(data, "data");
    });

    formViewer.on("changed", (event) => {
      const { data } = event;
      console.log(data, "data");
    });

    // set creditor field to error

    setformViewer(formViewer);
  };

  const loadFormEditor = () => {
    // formEditor?.destroy(); // destroy old editor
    const formEditor = new FormEditor({
      container: document.querySelector("#form-editor"),
      additionalModules: [SignatureExtension],
    });
    formEditor.importSchema(schema);
    setFormEditor(formEditor);
  };

  const destroyEditor = () => {
    try {
      formEditor.destroy();
    } catch (error) {
      console.log(error);
    }
  };

  const destroyViewer = () => {
    try {
      formViewer.destroy();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <head>
        {/* css for editor and viewer */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/@bpmn-io/form-js@1.6.0/dist/assets/form-js.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@bpmn-io/form-js@1.6.0/dist/assets/form-js-editor.css"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        ></link>

        <link
          href="https://unpkg.com/@bpmn-io/form-js/dist/assets/form-js.css"
          rel="stylesheet"
        ></link>
        {/* form playground css */}
        {/* <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://unpkg.com/@bpmn-io/form-js@0.10.0/dist/assets/form-js.css"></link>
        <link rel="stylesheet" href="https://unpkg.com/@bpmn-io/form-js@0.10.0/dist/assets/form-js-editor.css"></link>
        <link rel="stylesheet" href="https://unpkg.com/@bpmn-io/form-js@0.10.0/dist/assets/form-js-playground.css"></link> */}
      </head>
      <div id="form-editor"></div>
      <div id="form-viewer"></div>

      <button onClick={() => console.log(formSchema)}>log</button>
      <button onClick={() => saveSchema()}>set</button>
      <button
        onClick={() => {
          saveSchema();
          destroyEditor();

          const schema = formEditor.saveSchema();
          loadFormViewer(schema, data);
        }}
      >
        viewer
      </button>
      <button
        onClick={() => {
          destroyViewer();
          loadFormEditor();
        }}
      >
        editor
      </button>
    </div>
  );
};

export default FormEditorPage;
