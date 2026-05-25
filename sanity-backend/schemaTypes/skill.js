export default {
  name: 'skill',
  title: 'Skills (المهارات)',
  type: 'document',
  fields: [
    {
      name: 'titleAr',
      title: 'اسم المهارة (عربي)',
      type: 'string',
    },
    {
      name: 'titleEn',
      title: 'Skill Name (English)',
      type: 'string',
    },
    {
      name: 'descAr',
      title: 'وصف مختصر (عربي)',
      type: 'text',
    },
    {
      name: 'descEn',
      title: 'Short Description (English)',
      type: 'text',
    },
    {
      name: 'percentage',
      title: 'نسبة الاحتراف (مثلاً: 90)',
      type: 'number',
      validation: Rule => Rule.min(1).max(100) // لضمان ألا تتجاوز 100%
    },
    {
      name: 'icon',
      title: 'أيقونة المهارة (صورة SVG أو PNG)',
      type: 'image',
    },
  ],
}