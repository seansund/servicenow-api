import {ChangeRequest} from '../../models/change-request.model';

export abstract class GithubReviewApi {
  async abstract createPendingReview(changeRequest: ChangeRequest): Promise<string>;
  async abstract approveReview(changeRequest: ChangeRequest);
  async abstract rejectReview(changeRequest: ChangeRequest);
}
