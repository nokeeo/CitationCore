require('../../utils/array');

const Style = require('./style');

/*
 * Generates the string that represents the author's name in APA
 * @param {Author} author - The Author to generate the name string from
 * @return An APA representation of the authors name.  Will be null if a name cannot be generated.
 */
function getAuthorName(author) {
  // If the author has a name
  if (author.lastName != null || author.firstName != null) {
    // If we have the authors first and last name
    if (author.lastName && author.firstName) {
      return `${author.lastName}, ${author.firstName[0]}.`;
    }
    // If we just have the authors first or last name
    return (author.lastName != null) ? author.lastName : author.firstName;
  }

  return null;
}

/**
 * Style for the APA Format
 * @class
 * @augments model.styles.Style
 * @memberof model.styles
 */
class APA extends Style {
  static format(sourceData) {
    let returnString = '';

    // Authors
    sourceData.authors.forEach((author, index, array) => {
      const authorName = getAuthorName(author);
      returnString += (authorName != null) ? authorName : '';

      if (array.isNFromLastIndex(index, 1)) {
        returnString += ' & ';
      }
      else if (!array.isLastIndex(index)) {
        returnString += ', ';
      }
    });

    // Year
    if (sourceData.releaseDate != null) {
      returnString += ` (${sourceData.releaseDate.getFullYear()}).`;
    }

    // Title
    if (sourceData.name != null) {
      returnString += ` "${sourceData.name}".`;
    }

    // Version
    if (sourceData.version != null) {
      returnString += ` Version: ${sourceData.version}.`;
    }

    // URL
    if (sourceData.url != null) {
      returnString += ` Retrieved From: ${sourceData.url}`;
    }

    return returnString;
  }
}

module.exports = APA;
