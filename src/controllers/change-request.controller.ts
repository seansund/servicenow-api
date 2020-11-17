import {GET, PATCH, Path, PathParam, POST} from 'typescript-rest';
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
  async createStandardChangeRequest(@Context context: ServiceContext, @PathParam('templateId') templateId: string) {
    const queryParams = context.request.query;

    return this.service.createChangeRequest(templateId, 'standard', queryParams);
  }

  @GET
  @Path('standard/:sysId')
  async getStandardChangeRequest(@PathParam('sysId') sysId: string) {
    return this.getChangeRequest(sysId);
  }

  @PATCH
  @Path(':sysId/approvals')
  async approveRejectChangeRequest(@PathParam('sysId') sysId: string, approval: ChangeRequestApproval): Promise<ChangeRequest> {
    return this.approveRejectChangeRequest(sysId, approval);
  }
}