import { isValidBase64Image } from './validation';

export async function imageUrlToBase64(url: string): Promise<string> {
  if (!url) throw new Error('No URL provided');
  if (url.startsWith('data:image/')) return url; // Already base64

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        
        ctx.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL('image/jpeg');
        resolve(base64);
      } catch (error) {
        reject(new Error(`Failed to convert image: ${error.message}`));
      }
    };
    img.onerror = () => reject(new Error(`Failed to load image from URL: ${url}`));
    img.src = url;
  });
}

export function base64ToFile(base64String: string, filename: string): File {
  if (!isValidBase64Image(base64String)) {
    throw new Error('Invalid image format');
  }

  try {
    const [header, data] = base64String.split(';base64,');
    const mimeType = header.replace('data:', '');
    const byteCharacters = atob(data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    return new File([blob], filename, { type: mimeType });
  } catch (error) {
    throw new Error(`Failed to convert base64 to file: ${error.message}`);
  }
}