import {Inject} from 'typescript-ioc';
import { v4 as uuidv4 } from 'uuid';

import {ChangeRequestApi} from './change-request.api';
import {ChangeRequest} from '../models/change-request.model';
import {ChangeRequestApproval} from '../models/change-request-approval.model';
import {GithubReviewApi} from './github-review';
import {LoggerApi} from '../logger';

export class ChangeRequestMock implements ChangeRequestApi {
  @Inject
  gitReview: GithubReviewApi;
  @Inject
  _logger: LoggerApi;

  changeRequests: ChangeRequest[] = [];

  get logger() {
    return this._logger.child('ChabgeRequestMock');
  }

  async createChangeRequest(templateId: string, type: 'standard' | 'normal', values: any): Promise<ChangeRequest> {

    const changeRequest: ChangeRequest = Object.assign({sysId: uuidv4(), type, state: 'pending'}, values);

    if (changeRequest.pullRequestUrl) {
      try {
        const reviewUrl = await this.gitReview.createPendingReview(changeRequest);

        changeRequest.reviewUrl = reviewUrl;
      } catch (err) {
        this.logger.error('Error creating review in Git', {error: err, errorMessage: err.message});
      }
    }

    this.changeRequests.push(changeRequest);

    return changeRequest;
  }

  async getChangeRequest(sysId: string): Promise<ChangeRequest> {
    const results: ChangeRequest[] = this.changeRequests.filter(val => val.sysId === sysId);

    if (results.length == 0) {
      throw new Error('Change request not found: ' + sysId);
    }

    return results[0];
  }

  async approveRejectChangeRequest(sysId: string, approval: ChangeRequestApproval): Promise<ChangeRequest> {
    const changeRequest: ChangeRequest = await this.getChangeRequest(sysId);

    Object.assign(changeRequest, approval);

    if (changeRequest.reviewUrl) {
      if (changeRequest.state === 'approved') {
        await this.gitReview.approveReview(changeRequest);
      } else {
        await this.gitReview.rejectReview(changeRequest);
      }
    } else {
      this.logger.warn("No reviewUrl provided");
    }

    return changeRequest;
  }
}