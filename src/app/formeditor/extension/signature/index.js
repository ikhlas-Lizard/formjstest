import { SignatureRenderer, signatureType } from './Signature';

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
class CustomFormFields {
  constructor(formFields) {
    formFields.register(signatureType, SignatureRenderer);
  }
}


export default {
  __init__: [ 'signatureField' ],
  // uploadField: [ 'type', CustomFormFields ]
  signatureField: [ 'type', CustomFormFields ]
};