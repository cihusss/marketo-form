export const FormBreaker = (currentScript) => {
  console.log('FormBreaker v1.14 loaded');

  let formId;

  try {
    formId = document.getElementsByClassName('lp-form')[0].id.split('mktoForm_').pop();
  } catch (e) {
    console.log('No form ID found in DOM');
    return;
  }
  if (formId === undefined) {
    console.log('No form ID found in DOM');
    return;
  }
  console.log(`Found form ${formId} in DOM`);

  MktoForms2.loadForm('https://learn.bisk.com', '058-NIT-467', formId);

  //////////// Marketo Form Config ///////////

  const requiredFields = currentScript.getAttribute('requiredFields').split(',');
  const btnBg = currentScript.getAttribute('btnBg');
  const btnFg = currentScript.getAttribute('btnFg');
  const groupField = currentScript.getAttribute('groupField');
  const rq = [];

  requiredFields.forEach((field) => {
    rq.push({
      name: field.trim(),
      message: 'This field is required.',
    });
  });

  var userConfig = {
    buttons: {
      prev: {
        label: 'Back',
        disabled: false,
      },
      next: {
        label: 'Next',
      },
    },

    requiredFields: rq,
  };

  //////////// Marketo Form Magic ///////////

  MktoForms2.whenReady(function (form) {
    console.log(`Form ${formId} is now ready`);

    let mForm = form;
    var formEl = form.getFormElem()[0],
      arrayify = getSelection.call.bind([].slice);

    var fieldRowStor = '.mktoForm > .mktoFormRow',
      buttonRowStor = '.mktoForm > .mktoButtonRow',
      buttonStor = '.mktoButtonRow .mktoButton',
      fsaatPrefix = 'fsaat-',
      localFragmentAttr = 'data-form-local-fragment';

    var CSSOM_RULEPOS_FIRST = 0;

    var fieldRows = formEl.querySelectorAll(fieldRowStor),
      submitButtonRow = formEl.querySelector(buttonRowStor),
      submitButton = submitButtonRow.querySelector(buttonStor);

    userConfig.requiredFields
      .map(function (fieldDesc) {
        fieldDesc.label = formEl.querySelector("[for='" + fieldDesc.name + "']");
        fieldDesc.refEl = formEl.querySelector("[name='" + fieldDesc.name + "']");
        return fieldDesc;
      })
      .forEach(function (fieldDesc) {
        fieldDesc.label.parentNode.classList.add('mktoRequiredField');
      });

    var dynableSheet = arrayify(document.styleSheets).filter(function (sheet) {
      return sheet.ownerNode.nodeName == 'STYLE';
    })[0];

    arrayify(fieldRows).forEach(function (row, rowIdx) {
      var rowPos = {
        isFirst: rowIdx == 0,
        isLast: rowIdx == fieldRows.length - 1,
      };

      // id each wrapper row in DOM order

      row.id = fsaatPrefix + rowIdx;

      var navButtonRow = rowPos.isLast ? submitButtonRow : submitButtonRow.cloneNode(true),
        newRowAxis = row.nextSibling,
        nextEnabled = !rowPos.isLast,
        prevEnabled = !rowPos.isFirst && !userConfig.buttons.prev.disabled,
        newButtonAxis,
        newButtonTmpl,
        navButtons = {};

      if (nextEnabled) {
        navButtons.next = navButtonRow.querySelector(buttonStor);
      }

      if (prevEnabled) {
        newButtonTmpl = newButtonAxis = navButtons.next || submitButton;
        navButtons.prev = newButtonTmpl.cloneNode();
      }

      Object.keys(navButtons).forEach(function (dir) {
        navButtons[dir].type = 'button';
        navButtons[dir].setAttribute('data-dir', dir);
        navButtons[dir].innerHTML = userConfig.buttons[dir].label;
      });

      if (nextEnabled) {
        row.parentNode.insertBefore(navButtonRow, newRowAxis);
      }

      if (prevEnabled) {
        newButtonAxis.parentNode.insertBefore(navButtons.prev, newButtonAxis);
      }

      navButtonRow.addEventListener('click', function (e) {
        if (e.target.tagName == 'BUTTON' && e.target.type == 'button') {
          if (e.target.getAttribute('data-dir') == 'next' && !isCustomValid(true, row)) {
            return;
          }
          fsaatSet(row, e.target.getAttribute('data-dir'));
        }
      });

      dynableSheet.insertRule(
        [
          '.mktoForm[' +
            localFragmentAttr +
            "='#" +
            row.id +
            "']" +
            ' ' +
            '.mktoFormRow#' +
            row.id +
            ',',
          '.mktoForm[' +
            localFragmentAttr +
            "='#" +
            row.id +
            "']" +
            ' ' +
            '.mktoFormRow#' +
            row.id +
            ' + ' +
            '.mktoButtonRow',
          '{ display: block; }',
        ].join(' '),
        CSSOM_RULEPOS_FIRST
      );
    });

    function fsaatSet(current, dir) {
      var FSAAT_DIR_PREV = 'prev',
        FSAAT_DIR_NEXT = 'next';

      var dir = dir || FSAAT_DIR_NEXT,
        currentIndex,
        newHash;

      if (current instanceof HTMLElement) {
        currentIndex = +current.id.split(fsaatPrefix)[1];
      } else if (!isNaN(current)) {
        currentIndex = current;
      } else {
        currentIndex = -1;
      }

      newHash = '#' + fsaatPrefix + (dir == FSAAT_DIR_NEXT ? ++currentIndex : --currentIndex);

      formEl.setAttribute(localFragmentAttr, newHash);
    }

    function isCustomValid(native, currentStep) {
      form.submittable(false);

      var currentStep = currentStep || formEl,
        currentValues = form.getValues();

      var currentUnfilled = userConfig.requiredFields.filter(function (fieldDesc) {
        return (
          currentStep.contains(fieldDesc.refEl) &&
          (!currentValues[fieldDesc.name] ||
            (fieldDesc.refEl.type == 'checkbox' && currentValues[fieldDesc.name] == 'no'))
        );
      });

      if (currentUnfilled.length) {
        form.showErrorMessage(currentUnfilled[0].message, MktoForms2.$(currentUnfilled[0].refEl));
        return false;
      } else {
        form.submittable(true);
        return true;
      }
    }

    form.onValidate(isCustomValid);
    fsaatSet();

    // UI Magic

    let labels = document.getElementsByClassName('mktoLabel');
    let inputs = document.getElementsByClassName('mktoField');
    let inputValues = [];

    for (i = 0; i < labels.length; i++) {
      let label = document.getElementsByClassName('mktoLabel')[i];
      label.style.opacity = '0';
      name = label.innerHTML.split('</div>').pop();
      let input = label.nextSibling.nextSibling;
      input.setAttribute('placeholder', name);
    }

    const labelLogic = (input) => {
      if (input.type !== 'radio') {
        input.addEventListener('focusin', function () {
          let boo = this.previousSibling.previousSibling;
          boo.style.opacity = '1';
          let placeholder = this.setAttribute('placeholder', '');
          this.setAttribute('style', 'padding: 12px 6px 0 6px !important');
        });
        input.addEventListener('focusout', function () {
          let boo = this.previousSibling.previousSibling;
          let placeholder = this.setAttribute('placeholder', boo.innerHTML.split('</div>').pop());
          if (this.value == '') {
            boo.style.opacity = '0';
            this.setAttribute('style', 'padding: 2px 6px 0 6px !important');
          } else {
            boo.style.opacity = '1';
          }
        });
      } else if (input.type === 'radio') {
      }
    };

    for (i = 0; i < inputs.length; i++) {
      let input = document.getElementsByClassName('mktoField')[i];
      labelLogic(input);
    }

    if (groupField === 'true') {
      try {
        let radio = document.querySelectorAll(`input[type='radio']`)[1];
        // let radio = document.querySelectorAll(`input[name=${groupField}]`)[1];
        let row = radio.parentNode.parentNode.parentNode.parentNode;
        radio.addEventListener('click', () => {
          setTimeout(() => {
            let input = row.nextSibling.childNodes[0].childNodes[1].childNodes[2];
            let label = row.nextSibling.childNodes[0].childNodes[1].childNodes[0];
            input.placeholder = label.innerText;
            labelLogic(input);
          }, 10);
        });
      } catch (e) {
        console.log('No custom group field found');
      }
    }

    let btnSubmit = document.querySelector('button[type="submit"]');
    btnSubmit.addEventListener('click', function () {
      for (i = 0; i < inputs.length; i++) {
        let inputVal = document.getElementsByClassName('mktoField')[i].value;
        console.log(inputVal);
        inputValues.push(inputVal);
      }
      // console.log(inputValues);
      if (inputValues.includes('')) {
        console.log('one of the values is empty');
      } else {
        btnSubmit.innerHTML = 'Wait...';
        // alert('booooom');
        document.querySelector('button[type="button"]:nth-child(1)').style.display =
          'none !important';
      }
    });
    btnSubmit.style.background = btnBg;
    btnSubmit.style.color = btnFg;

    try {
      let btnNext = document.querySelector('button[data-dir="next"]');
      btnNext.style.background = btnBg;
      btnNext.style.color = btnFg;
    } catch (e) {}

    let legends = document.querySelectorAll('legend');
    legends.forEach((element) => {
      let currText = element.innerHTML.replace('0', '');
      let steps = document.querySelectorAll('fieldset');
      element.innerHTML = currText + ' of ' + steps.length;
      if (legends.length === 1) {
        element.setAttribute('style', 'opacity: 0 !important');
        document.getElementById('fsaat-0').setAttribute('style', 'margin-top: -20px !important');
      } else {
        element.setAttribute('style', 'display: block !important');
      }
    });

    let lala = document.querySelectorAll('.mktoField');
    lala.forEach((element) => {
      element.addEventListener('focusin', function () {
        // console.log('focusIn');
        // element.setAttribute('style', 'padding: 12px 6px 0 6px !important');
      });
      element.addEventListener('focusout', function () {
        // console.log('focusOut');
        // element.setAttribute('style', 'padding: 2px 6px 0 6px !important');
      });
    });

    // Group Dropdowns

    arrayify(formEl.querySelectorAll('SELECT')).forEach(function (selectEl) {
      var currentOg;
      arrayify(selectEl.querySelectorAll('OPTION')).forEach(function (o, idx) {
        if (o.value == '[OPTGROUP]') {
          currentOg = document.createElement('OPTGROUP');
          currentOg.label = o.textContent;
          selectEl.appendChild(currentOg);
          selectEl.removeChild(o);
        } else {
          if (currentOg) currentOg.appendChild(o);
        }
      });
    });

    // Disable Inputs

    let hiddenEls = formEl.querySelectorAll('.mktoFormRow input[type="hidden"]');
    for (var i = 0; i < hiddenEls.length; i++) {
      hiddenEls[i].parentNode.style.display = 'none';
    }

    let optionEls = formEl.querySelectorAll('OPTION'),
      disabledTag = /^\[DISABLED\]\s/,
      _forEach = Array.prototype.forEach;
    _forEach.call(optionEls, function (opt) {
      if (disabledTag.test(opt.textContent)) {
        opt.textContent = opt.textContent.replace(disabledTag, '');
        opt.disabled = true;
      }
    });

    // Add hidden fields
    form.addHiddenFields({ Landing_Page_URL__c: document.location });
    // form.addHiddenFields({ mktoUTMTerm : currHead });

    // Show Form
    //document.getElementById("lp-form").style.opacity = 1;
  });
};
