(function () {

  function initEditableBuilder() {

    const editableElements = document.querySelectorAll('[data-tag="editable"]');
    if (!editableElements.length) return;

    // Create floating panel
    const panel = document.createElement('div');
    panel.id = 'editable-builder-panel';
    panel.style.position = 'fixed';
    panel.style.top = '10px';
    panel.style.left = '10px';
    panel.style.width = '300px';
    panel.style.maxHeight = '90vh';
    panel.style.overflowY = 'auto';
    panel.style.background = '#ffffff';
    panel.style.padding = '0';
    panel.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    panel.style.zIndex = '999999';
    panel.style.fontFamily = 'Arial, sans-serif';
    panel.style.borderRadius = '8px';

    // Header (Drag Handle)
    const header = document.createElement('div');
    header.innerText = 'PDF Generator';
    header.style.padding = '12px 15px';
    header.style.cursor = 'move';
    header.style.fontWeight = 'bold';
    header.style.background = '#f3f3f3';
    header.style.borderBottom = '1px solid #ddd';
    header.style.borderTopLeftRadius = '8px';
    header.style.borderTopRightRadius = '8px';

    panel.appendChild(header);

    const contentWrapper = document.createElement('div');
    contentWrapper.style.padding = '15px';
    panel.appendChild(contentWrapper);

    const form = document.createElement('div');
    contentWrapper.appendChild(form);

    // editableElements.forEach((el, index) => {

    //   const labelText = el.dataset.label || `Field ${index + 1}`;
    //   const fieldWrapper = document.createElement('div');
    //   fieldWrapper.style.marginBottom = '12px';

    //   const label = document.createElement('label');
    //   label.innerText = labelText;
    //   label.style.display = 'block';
    //   label.style.fontSize = '12px';
    //   label.style.marginBottom = '4px';
    //   label.style.fontWeight = 'bold';

    //   const textarea = document.createElement('textarea');
    //   textarea.style.width = '100%';
    //   textarea.style.minHeight = '50px';
    //   textarea.style.resize = 'vertical';
    //   textarea.value = el.innerHTML.trim();

    //   textarea.addEventListener('input', function () {
    //     el.innerHTML = this.value;
    //   });

    //   fieldWrapper.appendChild(label);
    //   fieldWrapper.appendChild(textarea);

    //   if (el.tagName.toLowerCase() === 'a' && el.dataset.url !== undefined) {

    //     const urlLabel = document.createElement('label');
    //     urlLabel.innerText = 'Link URL';
    //     urlLabel.style.display = 'block';
    //     urlLabel.style.fontSize = '12px';
    //     urlLabel.style.marginTop = '6px';
    //     urlLabel.style.fontWeight = 'bold';

    //     const urlInput = document.createElement('input');
    //     urlInput.type = 'text';
    //     urlInput.style.width = '100%';
    //     urlInput.value = el.getAttribute('href') || '';

    //     urlInput.addEventListener('input', function () {
    //       el.setAttribute('href', this.value);
    //     });

    //     fieldWrapper.appendChild(urlLabel);
    //     fieldWrapper.appendChild(urlInput);
    //   }

    //   form.appendChild(fieldWrapper);
    // });


// TEXT EDITABLE ELEMENTS
const textEditableElements = document.querySelectorAll('[data-tag="editable"]');

textEditableElements.forEach((el, index) => {

  const labelText = el.dataset.label || `Field ${index + 1}`;
  const fieldWrapper = document.createElement('div');
  fieldWrapper.style.marginBottom = '12px';

  const label = document.createElement('label');
  label.innerText = labelText;
  label.style.display = 'block';
  label.style.fontSize = '12px';
  label.style.marginBottom = '4px';
  label.style.fontWeight = 'bold';

  const textarea = document.createElement('textarea');
  textarea.style.width = '100%';
  textarea.style.minHeight = '40px';
  textarea.style.resize = 'vertical';

  textarea.value = el.innerText.trim();

  textarea.addEventListener('input', function () {
    el.innerText = this.value;
  });

  fieldWrapper.appendChild(label);
  fieldWrapper.appendChild(textarea);

  form.appendChild(fieldWrapper);
});


// URL EDITABLE ELEMENTS
const urlEditableElements = document.querySelectorAll('[data-url="true"]');

urlEditableElements.forEach((el, index) => {

  const labelText = el.dataset.label || `Link ${index + 1}`;
  const fieldWrapper = document.createElement('div');
  fieldWrapper.style.marginBottom = '12px';

  const label = document.createElement('label');
  label.innerText = labelText + " URL";
  label.style.display = 'block';
  label.style.fontSize = '12px';
  label.style.marginBottom = '4px';
  label.style.fontWeight = 'bold';

  const input = document.createElement('input');
  input.type = 'text';
  input.style.width = '100%';
  input.value = el.getAttribute('href') || '';

  input.addEventListener('input', function () {
    el.setAttribute('href', this.value);
  });

  fieldWrapper.appendChild(label);
  fieldWrapper.appendChild(input);

  form.appendChild(fieldWrapper);
});
    // Generate PDF Button
    const generateBtn = document.createElement('button');
    generateBtn.innerText = 'Generate PDF';
    generateBtn.style.marginTop = '10px';
    generateBtn.style.padding = '8px 12px';
    generateBtn.style.cursor = 'pointer';
    generateBtn.style.background = 'black';
    generateBtn.style.color = 'white';
    generateBtn.style.width = '100%';

    generateBtn.addEventListener('click', function () {
      panel.style.display = 'none';
      window.print();
      setTimeout(() => {
        panel.style.display = 'block';
      }, 1000);
    });

    contentWrapper.appendChild(generateBtn);
    document.body.appendChild(panel);

    // Print CSS
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        #editable-builder-panel {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // -----------------------------
    // Draggable Logic
    // -----------------------------
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener('mousedown', function (e) {
      isDragging = true;
      offsetX = e.clientX - panel.offsetLeft;
      offsetY = e.clientY - panel.offsetTop;
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      panel.style.left = (e.clientX - offsetX) + 'px';
      panel.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', function () {
      isDragging = false;
      document.body.style.userSelect = 'auto';
    });

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEditableBuilder);
  } else {
    initEditableBuilder();
  }

})();