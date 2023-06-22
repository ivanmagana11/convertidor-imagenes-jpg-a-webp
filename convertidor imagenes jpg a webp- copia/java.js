document.getElementById('convert-button').addEventListener('click', convertToWebP);

function convertToWebP() {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];

  if (file && file.type === 'image/jpeg') {
    const reader = new FileReader();

    reader.onload = function(e) {
      const imgDataUrl = e.target.result;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function(blob) {
          const webpDataUrl = URL.createObjectURL(blob);
          document.getElementById('output-image').src = webpDataUrl;
        }, 'image/webp');
      };

      img.src = imgDataUrl;
    };

    reader.readAsDataURL(file);
  } else {
    alert('Selecciona un archivo JPG válido.');
  }
}
