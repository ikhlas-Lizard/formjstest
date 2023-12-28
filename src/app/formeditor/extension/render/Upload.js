import classNames from "classnames";

/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import {
  Errors,
  FormContext,
  Numberfield,
  Description,
  Label,
} from "@bpmn-io/form-js";

import { html, useContext } from "diagram-js/lib/ui";

import "./styles.css";

export const uploadType = "uploadFile";

export function FileUploadInput(props) {
  console.log(props);
  const onFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the uploaded file here (e.g., pass it to props.onChange)
    console.log(file);
  };
  // accept="image/*, .pdf, .doc, .docx"
  return html`<div class="file-upload">
    <label for="file-upload-input"> Choose a file... </label>
    <input
      type="file"
      id="file-upload-input"
      disabled=${props.disabled}
      onChange=${onFileChange}
      accept=".pdf"
    />
  </div>`;
}

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function UploadRenderer(props) {
  const { disabled, errors = [], field, readonly, value } = props;

  const { description, range = {}, id, label } = field;

  const { formId } = useContext(FormContext);

  const errorMessageId =
    errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  return html`<div class=${formFieldClasses(uploadType)}>
    <${FileUploadInput} disabled=${disabled} />
    <${Description} description=${description} />
    <${Errors} errors=${errors} id=${errorMessageId} />
  </div>`;
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries
 * and much more.
 */

console.log(Numberfield.config);
UploadRenderer.config = {
  /* we can extend the default configuration of existing fields */
  // ...Numberfield.config,
  create: (options = {}) => ({
    ...options,
  }),
  keyed: true,
  type: uploadType,
  group: "basic-input",
  label: "Upload file",
  iconUrl: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+UlEQVR4nO2YWwrCQAxFzyo64v5XYn/0SwWxupqIEKGUvpRRErkHQgfE6ZzctIjwfRqv1GyAq9dznZICXADzugNbkktYRpkN0PnBX9f+usswZqWXxM27/xJpep+FTqaMSNATIYNMmZAYioSWKTMSYyJhZc4LD/GYyPClcCIAB+A48yaaEsG/85TYkwCbEUmFSSQYSqQmtrLaFXtM0b5xn49Ze4Pdij1CiKTfwyIcAokE6yZKJFg3USLBuokSCdZNlEiwbqJEgnWTIIm0Cz/zf3IOC/LHgUnEUSKVMY2Wo9GqjGm0HI1WZUyj5Wi0KmMarX8dLQtS/L3IA0inVIWgq3THAAAAAElFTkSuQmCC`,
  propertiesPanelEntries: [
    "key",
    "label",
    "description",
    "disabled",
    "readonly",
  ],
};

// helper //////////////////////

function formFieldClasses(
  type,
  { errors = [], disabled = false, readonly = false } = {}
) {
  if (!type) {
    throw new Error("type required");
  }

  return classNames("fjs-form-field", `fjs-form-field-${type}`, {
    "fjs-has-errors": errors.length > 0,
    "fjs-disabled": disabled,
    "fjs-readonly": readonly,
  });
}

function prefixId(id, formId) {
  if (formId) {
    return `fjs-form-${formId}-${id}`;
  }

  return `fjs-form-${id}`;
}
