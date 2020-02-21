import slugify from "slugify";

export function slugit(title) {
  return slugify(title, {
    replacement: "-",
    remove: /[*+~.()'"!:@,]/g,
    lower: true
  });
}
