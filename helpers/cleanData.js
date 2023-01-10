function cleanData(data) {
  return data.split('<code data-language="ruby">').at(1).split('</code>').at(0);
}

module.exports = cleanData;
