export default {
  name: 'project',
  title: 'Projects (المشاريع)',
  type: 'document',
  fields: [
    {
      name: 'titleAr',
      title: 'عنوان المشروع (عربي)',
      type: 'string',
    },
    {
      name: 'titleEn',
      title: 'Project Title (English)',
      type: 'string',
    },
    {
      name: 'image',
      title: 'صورة المشروع (Image)',
      type: 'image',
      options: {
        hotspot: true, // للسماح بقص الصورة وتعديلها من اللوحة
      },
    },
    {
      name: 'descriptionAr',
      title: 'وصف المشروع (عربي)',
      type: 'text',
    },
    {
      name: 'descriptionEn',
      title: 'Project Description (English)',
      type: 'text',
    },
    {
      name: 'tags',
      title: 'التقنيات المستخدمة (Tags like React, Tailwind)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'link',
      title: 'رابط المشروع (Live Link or GitHub)',
      type: 'url',
    },
  ],
}
