import { UploadRenderer, uploadType } from './Upload';

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(uploadType, UploadRenderer);
  }
}


export default {
  __init__: [ 'uploadField' ],
  uploadField: [ 'type', CustomFormFields ]
};