export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD') // pisahkan karakter unicode
    .replace(/[\u0300-\u036f]/g, '') // hapus diacritics (é → e)
    .replace(/[^a-z0-9\s-]/g, '') // hapus karakter non-alfanumerik
    .replace(/\s+/g, '-') // spasi → dash
    .replace(/-+/g, '-') // multiple dash → single dash
    .replace(/^-|-$/g, ''); // trim dash di awal/akhir
}
