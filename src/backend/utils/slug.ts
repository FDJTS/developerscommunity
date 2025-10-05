export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateUniqueSlug = async (
  text: string,
  model: any,
  id?: string
): Promise<string> => {
  let slug = generateSlug(text);
  let counter = 1;
  
  while (true) {
    const existing = await model.findUnique({
      where: { slug },
    });
    
    if (!existing || existing.id === id) {
      break;
    }
    
    slug = `${generateSlug(text)}-${counter}`;
    counter++;
  }
  
  return slug;
};
