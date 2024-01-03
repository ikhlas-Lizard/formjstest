"use client";
import { useEffect } from "react";
import { FormEditor } from "@bpmn-io/form-js-editor";

export default function Home() {
  useEffect(() => {
    const schema = {
      "components": [
        {
          "key": "creditor",
          "label": "Creditor",
          "type": "textfield",
          "validate": {
            "required": true
          }
        },
      ],
      "type": "default"
    }    

    const loadForm = async () => {
      const formEditor = new FormEditor({
        container: document.querySelector("#form-editor"),
      });

      // await formEditor.createFormEditor();
    };

    loadForm();
  }, []);
  return (
    <div id="form-editor"></div>
  );
}
