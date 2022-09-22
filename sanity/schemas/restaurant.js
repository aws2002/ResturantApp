export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Restaurant Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      title: "Image of the Restaurant",
      type: "image",
    },
    {
      name: "lat",
      title: "Latitude of the Restaurant",
      type: "number",
    },
    {
      name: "Long",
      title: "Longitude of the Restaurant",
      type: "number",
    },
    {
      name: "address",
      title: "Restaurant address",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Enter a rating from (1-5 Stars)",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Plz enter a value between 1 and 5"),
    },
    {
      name: "type",
      title: "Category",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "category" }],
    },
    {
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{ type: "reference" ,to:[{type: "dish"}]}],
    },
  ],
};
