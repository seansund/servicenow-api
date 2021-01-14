import {Context, GET, PATCH, Path, PathParam, POST, ServiceContext} from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {ChangeRequestApi} from '../services/change-request.api';
import {ChangeRequestApproval} from '../models/change-request-approval.model';
import {ChangeRequest} from '../models/change-request.model';

@Path('/sn_chg_rest/change')
export class ChangeRequestController {
  @Inject
  service: ChangeRequestApi;

  @POST
  @Path('standard/:templateId')
  async createStandardChangeRequest(@PathParam('templateId') templateId: string, values: any) {
    return this.service.createChangeRequest(templateId, 'standard', values);
  }

  @GET
  @Path('standard/:sysId')
  async getStandardChangeRequest(@PathParam('sysId') sysId: string) {
    return this.service.getChangeRequest(sysId);
  }

  @GET
  @Path('standard')
  async listStandardChangeRequests() {
    return this.service.getChangeRequests();
  }

  @PATCH
  @Path('standard/:sysId')
  async updateChangeRequest(@PathParam('sysId') sysId: string, values: ChangeRequest) {
    return this.service.updateChangeRequest(sysId, values);
  }

  @PATCH
  @Path(':sysId/approvals')
  async approveRejectChangeRequest(@PathParam('sysId') sysId: string, approval: ChangeRequestApproval): Promise<ChangeRequest> {
    return this.service.approveRejectChangeRequest(sysId, approval);
  }
}
