import {GET, PATCH, PathParam} from 'typescript-rest';
import {ChangeRequest} from '../models/change-request.model';
import {ChangeRequestApproval} from '../models/change-request-approval.model';

export abstract class ChangeRequestApi {

  async abstract createChangeRequest(templateId: string, type: 'standard' | 'normal', values: any): Promise<ChangeRequest>;

  async abstract getChangeRequest(sysId: string): Promise<ChangeRequest>;

  async abstract approveRejectChangeRequest(sysId: string, approval: ChangeRequestApproval): Promise<ChangeRequest>;
}
