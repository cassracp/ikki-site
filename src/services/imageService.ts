/**
 * Redimensiona uma imagem mantendo a proporção e converte para WebP Base64.
 * @param file Arquivo de imagem local
 * @param maxSize Tamanho máximo (largura ou altura) em pixels
 * @returns Promise com a string Base64 da imagem processada
 */
export const processImage = (
  file: File,
  maxSize: number = 500
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Não foi possível obter o contexto do Canvas"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Converte para WebP (fallback para JPEG se não suportado pelo browser na exportação)
        const base64 = canvas.toDataURL("image/webp", 0.8);
        resolve(base64);
      };
      img.onerror = () => reject(new Error("Erro ao carregar imagem"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsDataURL(file);
  });
};
