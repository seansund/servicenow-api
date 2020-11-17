import { v4 as uuidv4 } from 'uuid';
import {ChangeRequestApi} from './change-request.api';
import {ChangeRequest} from '../models/change-request.model';
import {ChangeRequestApproval} from '../models/change-request-approval.model';

export class ChangeRequestMock implements ChangeRequestApi {

  changeRequests: ChangeRequest[] = [];

  async createChangeRequest(templateId: string, type: 'standard' | 'normal', values: any): Promise<ChangeRequest> {

    const changeRequest = Object.assign({sysId: uuidv4(), type}, values);

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

    return changeRequest;
  }
}