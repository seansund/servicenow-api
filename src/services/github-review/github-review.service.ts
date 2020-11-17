import {post} from 'superagent';

import {GithubReviewApi} from './github-review.api';
import {ChangeRequest} from '../../models/change-request.model';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../../logger';

const GIT_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export class GithubReviewService implements GithubReviewApi {
  @Inject
  _logger: LoggerApi;

  get logger() {
    return this._logger.child('GithubReviewService');
  }

  async createPendingReview(changeRequest: ChangeRequest): Promise<string> {

    const url = `${changeRequest.pullRequestUrl}/reviews`;

    this.logger.info('Creating pending review: ' + url, {changeRequest});

    const result = await post(url)
      .set({'User-Agent': 'ServiceNow mock'})
      .accept('application/vnd.github.v3+json')
      .auth(GIT_USER, GITHUB_TOKEN)
      .send({event: 'PENDING'});

    const {id} = result.body;

    return `${url}/${id}`;
  }
  
  async approveReview(changeRequest: ChangeRequest) {

    const url = `${changeRequest.reviewUrl}/events`;

    this.logger.info('Approving review: ' + url, {changeRequest});

    await post(url)
      .set({'User-Agent': 'ServiceNow mock'})
      .accept('application/vnd.github.v3+json')
      .auth(GIT_USER, GITHUB_TOKEN)
      .send({
        event: 'APPROVE',
        body: `Approved in ServiceNow ticket: ${changeRequest.sysId}`
      });

    try {
      await this.addLabels(changeRequest, ['approved']);
    } catch (err) {
      this.logger.error('Error adding labels', {error: err, errorMessage: err.message});
    }
  }

  async addLabels(changeRequest: ChangeRequest, labels: string[]) {

    const url = `${changeRequest.pullRequestUrl}/labels`;

    this.logger.info('Creating label: ' + url, {changeRequest, labels});

    await post(url)
      .set({'User-Agent': 'ServiceNow mock'})
      .accept('application/vnd.github.v3+json')
      .auth(GIT_USER, GITHUB_TOKEN)
      .send({labels});
  }

  async rejectReview(changeRequest: ChangeRequest) {

    const url = `${changeRequest.reviewUrl}/events`;

    this.logger.info('Rejecting review: ' + url, {changeRequest});

    await post(url)
      .set({'User-Agent': 'ServiceNow mock'})
      .accept('application/vnd.github.v3+json')
      .auth(GIT_USER, GITHUB_TOKEN)
      .send({
        event: 'REQUEST_CHANGES',
        body: `Rejected in ServiceNow ticket: ${changeRequest.sysId}`
      });
  }

}