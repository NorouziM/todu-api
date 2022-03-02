/**
 *
 * @param {Request object} req
 * @param {String} param
 * @returns String
 */
export const getTranslatedText = (req, param) => {
  return req.i18n_texts[param];
};
