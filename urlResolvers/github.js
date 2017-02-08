const URLResolver = require('./urlResolver');
const GitHubAPIHandler = require('../sourceHandlers/gitHub');
const GitHandler = require('../sourceHandlers/git');

const stripHttp = /^(http(s)?:\/\/)?(www.)?/;
const urlRegex = /^github\.com\/([\w,-]+)\/([\w,-]+)/;

const apiBaseUrl = 'https://api.github.com/';
const gitBaseUrl = 'https://github.com/';

/**
 * Creates the supported source handlers for a given URL.
 * @class
 * @memberof urlResolvers
 * @augments urlResolvers.URLResolver
 */
class GitHubResolver extends URLResolver {
  static getSourceHandlers(url) {
    const repoInfo = this._parseURL(url);
    if (repoInfo != null) {
      const repoPath = `${repoInfo.owner}/${repoInfo.repoName}`;
      const gitUrl = `${gitBaseUrl}${repoPath}.git`;

      return [new GitHubAPIHandler(apiBaseUrl, repoPath), new GitHandler(gitUrl)];
    }

    return [];
  }

  static _parseURL(url) {
    const strippedURL = url.replace(stripHttp, '');
    const matches = urlRegex.exec(strippedURL);
    if (matches != null && matches.length === 3) {
      return {
        owner: matches[1],
        repoName: matches[2],
      };
    }

    return null;
  }
}

module.exports = GitHubResolver;
