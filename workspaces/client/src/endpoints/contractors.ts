import { AxiosResponse } from 'axios';

import { GigWageHttpClient } from '../http-client';
import { paths } from '../schema';
import { Contractor, Contractor1099, ContractorW9, TIN } from '../types';

import {
  BusinessRelationshipEntity,
  ContractorInvitationEntity,
  Ten99Entity,
  W9Entity,
} from './entities';

const extractData = <T>(response: AxiosResponse<T>) => response.data;

type FindByOptions = {
  /**  Contractor email address */
  email?: string;
  /**  Customer assigned ID */
  external_id?: string;
  /**  Contractor ID */
  id?: string;
};

type ContractorCreateOptions = {
  contractor: {
    /**  Contractor email address */
    email: string;
    /**  Customer assigned ID */
    external_id?: string;
    /**  Contractor's first name */
    first_name: string;
    /**  Contractor's last name */
    last_name: string;
    /**
     *  Send email invitation when set to TRUE
     * @default false
     */
    send_invite?: boolean;
  };
};

type ContractorListOptions = {
  /**  Page offset to fetch. */
  offset?: number;
  /**  Pad a number of results. */
  page?: number;
  /**  Number of results to return per page. */
  per_page?: number;
  /**  Search query to find contractors */
  q?: string;
};

type ContractorInviteOptions = {
  id?: number;
};

type ContractorUpdateOptions = {
  contractor: {
    /**  Line address 1 */
    address1?: string;
    /**  Line address 2 */
    address2?: string;
    /**
     * Format: date
     *  Contractor's birthdate. Format: YYYY-MM-DD
     */
    birthdate?: string;
    /**  City */
    city?: string;
    /**  Contractor email address */
    email?: string;
    /**  Customer assigned ID */
    external_id?: string;
    first_name?: string;
    last_name?: string;
    /**  Contractor's phone number. Required if address exists. Example: 123-123-1234 or 1231231234 */
    phone_number?: string;
    /**  Contractor's social security number. For example: 123-12-12345 */
    social_security?: string;
    /**  State, 2 characters US State Code (ISO 3166-2) */
    state?: string;
    /**  Zip code */
    zip?: string;
  };
  id: number;
};

type ContractorDeleteOptions = {
  id: number;
};

type ContractorGetOptions = {
  /**  set true to return full information of contractor (including Address, phone number, and birthday) */
  full?: boolean;

  id: number;
  /**  set true to return security number of contractor */
  include_ssn?: boolean;
};

type ContractorGet1099sOptions = {
  id: number;

  /**  Pad a number of results. */

  offset?: number;
  /**  Page offset to fetch. */
  page?: number;
  /**  Number of results to return per page. */
  per_page?: number;
  year?: string;
};

type ContractorCreateTinCheckOptions = {
  id: number;
};

type ContractorUpdateW9Options = {
  contractor: {
    /**  Line address 1 */
    address1?: string;
    /**  Line address 2 */
    address2?: string;
    /**
     *  Allow skip TIN check when nine zeros are passed - '0000000000'
     * @default false
     */
    allow_tin_skip?: boolean;
    /**
     * Format: date
     *  Contractor's birthdate. Format: YYYY-MM-DD
     */
    birthdate?: string;
    /**  Vendor business name. Required for vendors */
    business_name?: string;
    /**  City */
    city?: string;
    /**  Vendor's DBA */
    dba?: string;
    /**  Vendor's EIN. Required for vendors. Example: 00-0000000 */
    ein?: string;
    /**  Contractor email address */
    email?: string;
    /**
     * Format: int32
     *  Exempt payee code
     */
    exempt_payee_code?: number;
    /**  Exemption from FATCA reporting code */
    fatca_reporting_exemption_code?: string;
    first_name?: string;
    last_name?: string;
    /**
     *  Contractor's tax classification for LLC is required if federal tax classification is Limited Liability Company
     * @enum {string}
     */
    llc_classification?: 'C' | 'S' | 'P';
    /**  Other Classification for LLC is required if Federal Tax Classification is Other */
    other_classification?: string;
    /**  Paper or Digital 1099 */
    paper_1099?: boolean;
    /**  Contractor's phone number. Example: 123-123-1234 or 1231231234 */
    phone_number?: string;
    /**  Contractor's social security number. For example: 123-12-1234 */
    social_security?: string;
    /**  State, 2 characters US State Code (ISO 3166-2) */
    state?: string;
    /**
     *  Contractor's federal tax classification is required
     * @enum {string}
     */
    tax_classification?:
      | 'single_member_llc'
      | 'c_corporation'
      | 's_corporation'
      | 'partnership'
      | 'trust_estate'
      | 'limited_liability_company'
      | 'other';
    /**  True when contractor is vendor */
    vendor?: boolean;
    /**  Zip code */
    zip?: string;
  };
  id: number;
};

type ContractorGetW9Options = {
  id: number;

  /**  set true to include social security */
  include_ssn?: string;
};

export const contractorEndpoints = (httpClient: GigWageHttpClient) => ({
  /**
   * Find a contractor by email, external_id or id.
   */
  findBy: (options: FindByOptions) =>
    httpClient
      .get<BusinessRelationshipEntity>(`contractors/find_by`, options)
      .then(extractData),

  /**
   * Creates a new contractor.
   */
  create: (options: ContractorCreateOptions) =>
    httpClient
      .post<BusinessRelationshipEntity>(`contractors`, {
        contractor: options,
      })
      .then(extractData),

  /**
   * List contractors.
   */
  list: (options: ContractorListOptions) =>
    httpClient
      .get<BusinessRelationshipEntity[]>(`contractors`, options)
      .then(extractData),

  /**
   * Provides invitation information for the contractor
   * to allow you to send the contractoran onboarding email.
   * If the contractor has an outstanding, unaccepted invitation,
   * the old invitation will be invalidated.
   */
  invite: ({ id }: ContractorInviteOptions) =>
    httpClient
      .post<ContractorInvitationEntity>(`contractors/${id}/invitations`)
      .then(extractData),

  /**
   * Updates an existing contractor.
   *
   * If the contractor has already registered,
   * changes to the email address will not affect email delivery.
   * Emails will be delivered to the address managed by the contractor.
   * Any supported attributes not supplied in the request will not be changed.
   */
  update: ({ id, ...rest }: ContractorUpdateOptions) =>
    httpClient
      .patch<BusinessRelationshipEntity>(`contractors/${id}`, {
        contractor: rest,
      })
      .then(extractData),

  /**
   * Delete contractor record.
   *
   * Note: You can only destroy new contractors
   * that aren't associated with other businesses or that have payments
   * or 1099s
   */
  delete: ({ id }: ContractorDeleteOptions) =>
    httpClient
      .delete<BusinessRelationshipEntity>(`/contractors/${id}`)
      .then(extractData),

  /**
   * Returns the details for a given contractor.
   */
  get: ({ id, full, include_ssn }: ContractorGetOptions) => {
    const options: Record<string, string> = {};
    if (full) options.full = '1';
    if (include_ssn) options.include_ssn = '1';

    return httpClient
      .get<BusinessRelationshipEntity>(`/contractors/${id}`, options)
      .then(extractData);
  },
  /**
   * List all 1099s for a contractor
   */
  getContractor1099s: ({ id, ...rest }: ContractorGet1099sOptions) =>
    httpClient
      .get<Ten99Entity[]>(`/contractors/${id}/1099s`, rest)
      .then(extractData),

  /**
   * Verify a contractor's TIN is valid. Note: TIN checks are automatically run on POST and PATCH W9 endpoints
   */
  createTinCheck: ({ id }: ContractorCreateTinCheckOptions) =>
    httpClient.post<W9Entity>(`/contractors/${id}/tin_check`).then(extractData),

  /**
   * Update W9 information for a contractor.
   */
  updateContractorW9: ({ id, ...options }: ContractorUpdateW9Options) =>
    httpClient
      .patch<W9Entity>(`/contractors/${id}/w9`, options)
      .then(extractData),

  /**
   * TODO:
   */
  getContractorW9: () => httpClient.get('/contractors/{id}/w9'),
  /**
   * TODO:
   */
  submitW9Information: () => {},
  /**
   * TODO:
   */
  submitWYCInformation: () => {},
  /**
   * TODO:
   */
  sendInviteToContractor: () => {},
  /**
   * TODO:
   */
  addAccountToContractor: () => {},
  /**
   * TODO:
   */
  listContractorAccounts: () => {},
  /**
   * TODO:
   */
  deactivateContractorAccount: () => {},
  /**
   * TODO:
   */
  getContractorAccountDetail: () => {},
  /**
   * TODO:
   */
  createContractorsIdentityDocument: () => {},
});
