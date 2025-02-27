export function isValidBase64Image(str: string): boolean {
  if (!str) return false;
  if (!str.startsWith('data:image/')) return false;
  if (!str.includes(';base64,')) return false;
  
  try {
    const [header, content] = str.split(';base64,');
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validMimeTypes.includes(header.replace('data:', ''))) return false;
    
    // Test if the content is valid base64
    atob(content);
    return true;
  } catch {
    return false;
  }
}