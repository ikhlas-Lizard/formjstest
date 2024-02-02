import classNames from 'classnames';
/*
 * Import components and utilities from our extension API. Warning: for demo experiments only.
 */
import { FormContext, Description } from '@bpmn-io/form-js';
import { html, useContext, useState } from 'diagram-js/lib/ui';
import './styles.css';

export const signatureType = 'signature';
/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
export function SignatureRenderer(props) {
  const { errors = [], field } = props;
  console.log('SignatureRenderer field', field);
  const { description, id, label, properties } = field;
  const allowedRoles = properties?.accessibleBy?.split(',') ?? [];
  console.log('SignatureRenderer allowedRoles', allowedRoles);
  const [showSignature, setShowSignature] = useState(false);
  const signatureImage =
    'https://upload.wikimedia.org/wikipedia/commons/5/5d/Sign_Joko_Widodo.png'; //TODO: get signature image from user profile
  const signatureDescription = 'Nabil Alkahar, SEA Manager'; //TODO: get signature description from user profile
  const userRole = 'MA'; // TODO: get user role from user profile
  const correctRoleForSignature = allowedRoles.includes(userRole);

  const handleAddSignature = (e) => {
    setShowSignature(true);
    props?.onChange({
      field,
      value: 'new_signature'
    })
  };

  return html`
    <div class=${formFieldClasses(signatureType)}>
      ${showSignature
        ? html`
            <div>
              <img class="fjs-form-field-signature-img" src=${signatureImage} />
              <h1 class="fjs-form-field-label-signature">${signatureDescription}</h1>
            </div>
          `
        : html`
            <button
            disabled=${!correctRoleForSignature}
            class=${correctRoleForSignature
                ? 'signature-button'
                : 'signature-button-disabled'}
              onClick=${handleAddSignature}
            >
              <span class="plus-icon">+</span>
              Add Signature
            </button>
          `}
    </div>
  `;
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries
 * and much more.
 */
SignatureRenderer.config = {
  create: (options = {}) => ({
    ...options,
  }),
  keyed: true,
  type: signatureType,
  group: 'basic-input',
  label: 'Signature',
  iconUrl: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEEUlEQVR4nO2Zf2hWZRTHP/thWdOaW6WipRgkRlo2iAosKMI/tCL7KzAZpf4RRVgYlQMZhRUF0WJ/ZD/IPwwKtaDo5z+mMUgpJ+UcTKlWMdRaOWPlpr5y4Hvh8HTv+947uONuvB94YTvPOe9znuee55zz3BeqTFzuBD4CfgaGgUPAK8A8Jghzgd1AKeHzF3AXBecO4LgcHgK2ANcAFwGLgW1uMbbgQrJMIWSO7gGuTND7RDovUkCWaJfNwXeB+jK6K6TXTcG4EPhRzn1YYRFGkwuvQrFFjvUAU1Mu3PRPUyCuB0aBM8DNKW1mayEDFIhdcqoj4+JLqiuF4GrgnJ7G/Ax2q7UQK5aF4Hk5tDOj3auy2xwzVq+FWvoeBI4B7UAdOdIrh6wVycJ3srM07LkM+DqhG9hAjmFVAv5MkW49cxWO/wINTn6Jzox952/AGmAG8IBk+8mJNZpgR0a7R2T3aSDfIfkPymoR8yQ/Qk68pgmezmi3T3YPO9lyVyAXBPrXuQXmwmcJcV6pjTGbf4DpTr5f8idibB7U2PvkRI8msB1LyxuyecfJFruzZhU/ZHveh/0PTdCcUn+2DrjZLHXydsk6Y2wuBk5q3JJLLgxrArtnpOEl6X8eyL+U/L4Ym3Ua+zZmzDLee3qSbSk6iU6VC/N7rx8c1SRpUu8snQvTvz0YOyH5nEBe6zpqOyeeC4AvXI05mxAZ1sBu1bivSVZs/xdaVsQq0Sldm9xTp0nOyHFPVD9+jTk7Uca0m2i//rZd98xxSeS0zmdLXAT1pjzs1wIjKoI3JtxLLDzCnezT2PpgbKW+yyLiVufsDU7nCudfn3xIZKcUW8vo1LiWw26NIZe6HfNP5AV3v5kS7HIUis9I9n2wkGmuBerWZpVlo5TfLKPT6nb88pjxWpfJomre4u43tzjdevdm5iu38MOSLVKofqz/j+psVqTFxanftYhmt3try3zPAencAzS6kHo5oWMeCBz83W1Eh9u4hYyhKJoTIW9p7BuFWKW0vMvt5r7gyvyY5P/pXHiG3LuCSOc2MvKUjLsC+b06kCMpk4FPjwNBKn5c33VWjWpIv7O1ML2fMTBdFx9f0K7So83SUHY5Z55UimxR8YzqxEMJts8Cp5RUzGbMPKrJTmj3u1ybHtaGOJ4r82rVPn8DqxgH6lybMeKKWKVC2ejuIGZ3t1r7HsV5n154z2QcaQJ+crtoPVIStbqTR7E9qCJXCOa7VFtSDbCsdZM62GbFb5vLdFGSyPL2JVcaVEGjFLpVWaZc3P+ip5LmDI0LNcAHcu6g2gN06F/X7g+rwbRW4m1da7O8rBgXNrlKmtvFJ2+W6yyM6sedCUmD+y3E2ocJS53Ohr0yrVKlyiSmNEk+TJqFVKlShUTOA+V4wbpb4aZYAAAAAElFTkSuQmCC`,
  propertiesPanelEntries: [
    'key',
    'label',
    'description',
    'accessibleBy',
    'disabled',
    'readonly',
  ],
};

// helper //////////////////////

function formFieldClasses(
  type,
  { errors = [], disabled = false, readonly = false } = {}
) {
  if (!type) {
    throw new Error('type required');
  }

  return classNames('fjs-form-field', `fjs-form-field-${type}`, {
    'fjs-has-errors': errors.length > 0,
    'fjs-disabled': disabled,
    'fjs-readonly': readonly,
  });
}

function prefixId(id, formId) {
  if (formId) {
    return `fjs-form-${formId}-${id}`;
  }

  return `fjs-form-${id}`;
}
