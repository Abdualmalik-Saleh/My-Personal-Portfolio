export default {
  name: 'service',
  title: 'Services (الخدمات)',
  type: 'document',
  fields: [
    {
      name: 'titleAr',
      title: 'عنوان الخدمة (عربي)',
      type: 'string',
    },
    {
      name: 'titleEn',
      title: 'Service Title (English)',
      type: 'string',
    },
    {
      name: 'descAr',
      title: 'وصف الخدمة (عربي)',
      type: 'text',
    },
    {
      name: 'descEn',
      title: 'Service Description (English)',
      type: 'text',
    },
    {
      name: 'icon',
      title: 'أيقونة الخدمة (Icon/Image)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}