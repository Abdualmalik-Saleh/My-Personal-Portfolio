export default {
  name: 'testimonial',
  title: 'Testimonials (آراء العملاء)',
  type: 'document',
  fields: [
    {
      name: 'clientNameAr',
      title: 'اسم العميل (عربي)',
      type: 'string',
    },
    {
      name: 'clientNameEn',
      title: 'Client Name (English)',
      type: 'string',
    },
    {
      name: 'feedbackAr',
      title: 'رأي العميل (عربي)',
      type: 'text',
    },
    {
      name: 'feedbackEn',
      title: 'Client Feedback (English)',
      type: 'text',
    },
    {
      name: 'date',
      title: 'التاريخ (Date)',
      type: 'string', // يمكن أن تكتبه نصاً مثل: 12/09/2023
    },
    {
      name: 'rating',
      title: 'التقييم (من 1 إلى 5)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5) // لضمان أن التقييم لا يتجاوز 5 نجوم
    },
  ],
}