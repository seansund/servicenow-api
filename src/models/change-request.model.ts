
export class ChangeRequest {
  sysId: string;
  type: 'standard' | 'normal';
  state: string;
  pullRequestUrl?: string;
  reviewUrl?: string;
  [key: string]: string;
}
