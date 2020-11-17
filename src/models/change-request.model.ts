
export class ChangeRequest {
  sysId: string;
  type: 'standard' | 'normal';
  state: string;
  [key: string]: string;
}
