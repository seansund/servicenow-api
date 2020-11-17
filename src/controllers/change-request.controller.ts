import {GET, PATCH, Path, PathParam, POST} from 'typescript-rest';

@Path('/sn_chg_rest/change')
export class ChangeRequestController {

  @POST
  @Path('standard/:templateId')
  async createStandardChangeRequest(@PathParam('templateId') templateId: string) {

  }

  @GET
  @Path('standard/:sysId')
  async getStandardChangeRequest(@PathParam('sysId') sysId: string) {

  }

  @PATCH
  @Path(':sysId/approvals')
  async approveRejectChangeRequest(@PathParam('sysId') sysId: string) {

  }
}