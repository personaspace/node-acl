module.exports = {
  middleware: (req, domain) => {
    return req.headers.host === domain
  },
  description: 'Checks the domain that a visitoris visiting from.',
  form: [
    {
      type: 'text',
      validate: /^((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})$/,
      examples: [
        'example.com'
      ]
    }
  ],
  writeParams: [
    (formValues) => {
      return formValues[0]
    }
  ]
}
