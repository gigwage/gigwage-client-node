import { GigWageHttpClient } from '../http-client';

export type Contractor = {
  /** The contractor's 1st address line */
  address1: string;

  /** The contractor's 2nd address line */
  address2: string;

  /** The contractor's birthdate */
  birthdate: number;

  /** The contractor's city */
  city: string;

  /** When the contractor record was created */
  created_at: number;

  /** The contractor's email address */
  email: string;

  /** Error messages generated by system */
  errors: string[];

  /** Optional customer-supplied unique identifier for this contractor */
  external_id: string;

  /** The contractor's first name */
  first_name: string;

  /** The contractor has connected an ACH account for receiving payments */
  has_ach: boolean;

  /** The contractor has a debit card for receiving payments */
  has_debit: boolean;

  /** The contractor's unique identifier */
  id: number;

  /** When the contractor accepted the invitation */
  invitation_accepted_at: number;

  /** When the contractor was sent an invitation to onboard */
  invited_at: number;

  /** The contractor's last name */
  last_name: string;

  /** The contractor's phone number */
  phone_number: string;

  /** The contractor's social security number */
  social_security: string;

  /** The contractor's state */
  state: string;

  /** The contractor's zip code */
  zip: string;
};

export type ContractorOptions = {
  /** Contractor email address */
  email?: string;

  /** Customer assigned ID */
  external_id?: string;

  /** Contractor ID */
  id?: string;
};

export const contractor =
  (httpClient: GigWageHttpClient) => (options: ContractorOptions) =>
    httpClient.get<Contractor>(`contractors/find_by`, options);

export type CreateContractorOptions = {
  /** Contractor email address */
  email: string;

  /** Customer assigned ID */
  external_id?: string;

  /** Contractor's first name */
  first_name: string;

  /** Contractor's last name */
  last_name: string;

  /** Send email invitation when set to TRUE */
  send_invite?: boolean;
};

export const createContractor =
  (httpClient: GigWageHttpClient) => (options: CreateContractorOptions) =>
    httpClient.post<Contractor>(`contractors`, options);

export type ContractorsOptions = {};

export const contractors =
  (httpClient: GigWageHttpClient) => (options: ContractorsOptions) =>
    httpClient.get<Contractor[]>(`contractors`, options);

export type InviteContractorOptions = {
  /** Contractor ID */
  id: number;
};

export type InviteContractorPayload = {
  /** When the contractor was sent an invitation to onboard */
  created_at: number;

  /** The contractor's email address */
  email: string;

  /** The contractor's first name */
  first_name: string;

  /** The contractor's unique identifier */
  id: number;

  /** The contractor's last name */
  last_name: string;

  /** The contractor's invitation token */
  token: string;

  /** The contractor's invitation url */
  url: string;
};

export const inviteContractor =
  (httpClient: GigWageHttpClient) =>
  ({ id }: InviteContractorOptions) =>
    httpClient.post<InviteContractorPayload>(`contractors/${id}/invitations`);

export type UpdateContractorOptions = {
  /** Line address 1 */
  address1?: string;

  /** Line address 2 */
  address2?: string;

  /** Contractor's birthdate. Format: YYYY-MM-DD */
  birthdate?: number;

  /** City */
  city?: string;

  /** Contractor email address */
  email?: string;

  /** Customer assigned ID */
  external_id?: string;

  /** Contractor's first name */
  first_name?: string;

  /** Contractor ID */
  id: string;

  /** Contractor's last name */
  last_name?: string;

  /** Contractor's phone number. Required if address exists. Example: 123-123-1234 or 1231231234 */
  phone_number?: string;

  /** Contractor's social security number. For example: 123-12-12345 */
  social_security?: string;

  /** State, 2 characters US State Code (ISO 3166-2) */
  state?: string;

  /** Zip code */
  zip?: string;
};

export const updateContractor =
  (httpClient: GigWageHttpClient) =>
  ({ id, ...rest }: UpdateContractorOptions) =>
    httpClient.patch<Contractor>(`contractors/${id}`, {
      contractor: rest,
    });

export type DeleteContractorOptions = {
  id: string;
};

export const deleteContractor =
  (httpClient: GigWageHttpClient) =>
  ({ id }: DeleteContractorOptions) =>
    httpClient.delete<Contractor>(`/contractors/${id}`);

export type GetContractor = {
  full?: boolean;
  id: string;
  include_ssn?: boolean;
};

export const getContractor =
  (httpClient: GigWageHttpClient) =>
  ({ id, full, include_ssn }: GetContractor) => {
    const options: Record<string, string> = {};
    if (full) options.full = '1';
    if (include_ssn) options.include_ssn = '1';

    return httpClient.get<Contractor>(`/contractors/${id}`, options);
  };
