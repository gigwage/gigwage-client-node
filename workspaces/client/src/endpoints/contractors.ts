import { GigWageHttpClient } from '../http-client';
import { Contractor, Contractor1099, ContractorW9, TIN } from '../types';

export type ContractorOptions = {
  /** Contractor email address */
  email?: string;

  /** Customer assigned ID */
  external_id?: string;

  /** Contractor ID */
  id?: string;
};
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

export type DeleteContractorOptions = {
  id: string;
};

export type GetContractor = {
  full?: boolean;
  id: string;
  include_ssn?: boolean;
};

export type ContractorsOptions = {};

export type GetContractor1099sOptions = {
  id: number;
  offset?: number;
  page?: number;
  per_page?: number;
  year?: string;
};

export type CreateTinCheckOptions = {
  id: number;
};

export type UpdateContractorW9 = {
  contractor: Omit<
    Partial<ContractorW9>,
    'tin_check_reason' | 'tin_check_status'
  >;
  id: string;
};

export const contractorEndpoints = (httpClient: GigWageHttpClient) => {
  const contractor = (options: ContractorOptions) =>
    httpClient.get<Contractor>(`contractors/find_by`, options);

  const createContractor = (options: CreateContractorOptions) =>
    httpClient.post<Contractor>(`contractors`, options);

  const contractors = (options: ContractorsOptions) =>
    httpClient.get<Contractor[]>(`contractors`, options);

  const inviteContractor = ({ id }: InviteContractorOptions) =>
    httpClient.post<InviteContractorPayload>(`contractors/${id}/invitations`);

  const updateContractor = ({ id, ...rest }: UpdateContractorOptions) =>
    httpClient.patch<Contractor>(`contractors/${id}`, {
      contractor: rest,
    });

  const deleteContractor = ({ id }: DeleteContractorOptions) =>
    httpClient.delete<Contractor>(`/contractors/${id}`);

  const getContractor = ({ id, full, include_ssn }: GetContractor) => {
    const options: Record<string, string> = {};
    if (full) options.full = '1';
    if (include_ssn) options.include_ssn = '1';

    return httpClient.get<Contractor>(`/contractors/${id}`, options);
  };

  const getContractor1099s = ({ id, ...rest }: GetContractor1099sOptions) =>
    httpClient.get<Contractor1099[]>(`/contractors/${id}/1099s`, rest);

  /**
   * Verify a contractor's TIN is valid.
   * Note: TIN checks are automatically run on POST and PATCH W9 endpoints
   */
  const createTinCheck = ({ id }: CreateTinCheckOptions) =>
    httpClient.post<TIN>(`/contractors/${id}/tin_check`);

  /**
   * Update W9 information for a contractor.
   */
  const updateContractorW9 = ({ id, ...options }: UpdateContractorW9) =>
    httpClient.patch<ContractorW9>(`/contractors/{id}/w9`, options);

  const getContractorW9 = () => {};
  const submitW9Information = () => {};
  const submitWYCInformation = () => {};
  const sendInviteToContractor = () => {};
  const addAccountToContractor = () => {};
  const listContractorAccounts = () => {};
  const deactivateContractorAccount = () => {};
  const getContractorAccountDetail = () => {};
  const createContractorsIdentityDocument = () => {};

  return {
    contractor,
    createContractor,
    contractors,
    inviteContractor,
    updateContractor,
    deleteContractor,
    getContractor,
    getContractor1099s,
    createTinCheck,
    updateContractorW9,
  };
};
