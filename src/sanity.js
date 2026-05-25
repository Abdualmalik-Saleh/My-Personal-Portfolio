import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'bg2qkbks',
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2024-05-21', 
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
