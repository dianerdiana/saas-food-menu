export const toFormData = (values: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    // Abaikan jika value null atau undefined
    if (value === null || value === undefined) return;

    // Jika value adalah File (seperti gambar dari ImageUpload)
    if (value instanceof File) {
      formData.append(key, value);
    }
    // Jika value adalah Objek atau Array (selain File)
    else if (typeof value === 'object' && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    }
    // Data primitif (string, number, boolean)
    else {
      formData.append(key, String(value));
    }
  });

  return formData;
};
