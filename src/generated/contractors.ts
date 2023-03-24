import { GigWageHttpClient } from '../http-client';

import {
  AccountEntity,
  BusinessRelationshipEntity,
  ContractorInvitationEntity,
  PatchApiV1Contractors,
  PatchApiV1ContractorsIdW9,
  PostApiV1Contractors,
  PostApiV1ContractorsContractorIdAccounts,
  PostApiV1ContractorsContractorIdCards,
  PostApiV1ContractorsContractorIdIdentityDocument,
  PostApiV1ContractorsIdKyc,
  PostApiV1ContractorsIdW9,
  Ten99Entity,
  W9Entity,
} from './types';

export type FindContractorUniquelyOptions = {
  /** Contractor email address */
  email?: string;
  /** Customer assigned ID */
  external_id?: string;
  /** Contractor ID */
  id?: string;
};

export type CreateContractorOptions = {} & PostApiV1Contractors;

export type ListContractorsOptions = {
  /** Search query to find contractors */
  q?: string;
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type InviteAContractorOptions = {
  id: number;
};

export type UpdateAContractorOptions = {
  id: number;
} & PatchApiV1Contractors;

export type DeleteAContractorOptions = {
  id: number;
};

export type ReturnAContractorOptions = {
  id: number;
  /** set 1 to return full information of contractor (including Address, phone number, and birthday) */
  full?: string;
  /** set 1 to return security number of contractor */
  include_ssn?: string;
};

export type ListAll1099sForAContractorOptions = {
  id: number;
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  year?: string;
};

export type CreateATINCheckOptions = {
  id: number;
};

export type UpdateW9InformationOptions = {
  id: number;
} & PatchApiV1ContractorsIdW9;

export type ShowW9InformationOptions = {
  id: number;
  /** set true to include social security */
  include_ssn?: string;
};

export type SubmitW9InformationOptions = {
  id: number;
} & PostApiV1ContractorsIdW9;

export type SubmitKYCInformationOptions = {
  id: number;
} & PostApiV1ContractorsIdKyc;

export type SendInviteToContractorOptions = {
  id: number;
};

export type AddAccountToContractorOptions = {
  contractor_id: number;
} & PostApiV1ContractorsContractorIdAccounts;

export type ListContractorAccountsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  contractor_id: number;
};

export type DeactivateAccountOptions = {
  /** Account ID */
  id: number;
  contractor_id: number;
};

export type GetAccountDetailOptions = {
  /** Account ID */
  id: number;
  contractor_id: number;
};

export type AddContractorDebitCardOptions = {
  contractor_id: number;
} & PostApiV1ContractorsContractorIdCards;

export type CreateContractorsIdentityDocumentOptions = {
  contractor_id: number;
} & PostApiV1ContractorsContractorIdIdentityDocument;

export function contractorsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Find a contractor by email, external_id or id. */

    findContractorUniquely: ({
      email,
      external_id,
      id,
    }: FindContractorUniquelyOptions = {}) =>
      httpClient
        .get<BusinessRelationshipEntity>(`/api/v1/contractors/find_by`, {
          email,
          external_id,
          id,
        })
        .then(r => r.data),

    /** Creates a new contractor. */

    createContractor: ({ ...options }: CreateContractorOptions) =>
      httpClient
        .post<BusinessRelationshipEntity>(`/api/v1/contractors`, options)
        .then(r => r.data),

    /** List contractors. */

    listContractors: ({
      q,
      page,
      per_page,
      offset,
    }: ListContractorsOptions = {}) =>
      httpClient
        .get<BusinessRelationshipEntity[]>(`/api/v1/contractors`, {
          q,
          page,
          per_page,
          offset,
        })
        .then(r => r.data),

    /** Provides invitation information for the contractor to allow you to send the contractoran onboarding email. If the contractor has an outstanding, unaccepted invitation, the old invitation will be invalidated. */

    inviteAContractor: ({ id, ...options }: InviteAContractorOptions) =>
      httpClient
        .post<ContractorInvitationEntity>(
          `/api/v1/contractors/${id}/invitations`,
          options,
        )
        .then(r => r.data),

    /** Updates an existing contractor. If the contractor has already registered, changes to the email address will not affect email delivery. Emails will be delivered to the address managed by the contractor. Any supported attributes not supplied in the request will not be changed. */

    updateAContractor: ({ id, ...options }: UpdateAContractorOptions) =>
      httpClient
        .patch<BusinessRelationshipEntity>(`/api/v1/contractors/${id}`, options)
        .then(r => r.data),

    /** Delete contractor record. Note: You can only destroy new contractors that aren't associated with other businesses or that have payments or 1099s  */

    deleteAContractor: ({ id }: DeleteAContractorOptions) =>
      httpClient
        .delete<BusinessRelationshipEntity>(`/api/v1/contractors/${id}`)
        .then(r => r.data),

    /** Returns the details for a given contractor. */

    returnAContractor: ({ id, full, include_ssn }: ReturnAContractorOptions) =>
      httpClient
        .get<BusinessRelationshipEntity>(`/api/v1/contractors/${id}`, {
          full,
          include_ssn,
        })
        .then(r => r.data),

    /** List all 1099s for a contractor */

    listAll1099sForAContractor: ({
      id,
      page,
      per_page,
      offset,
      year,
    }: ListAll1099sForAContractorOptions) =>
      httpClient
        .get<Ten99Entity[]>(`/api/v1/contractors/${id}/1099s`, {
          page,
          per_page,
          offset,
          year,
        })
        .then(r => r.data),

    /** Verify a contractor's TIN is valid. Note: TIN checks are automatically run on POST and PATCH W9 endpoints */

    createATINCheck: ({ id, ...options }: CreateATINCheckOptions) =>
      httpClient
        .post<W9Entity>(`/api/v1/contractors/${id}/tin_check`, options)
        .then(r => r.data),

    /** Update W9 information for a contractor. */

    updateW9Information: ({ id, ...options }: UpdateW9InformationOptions) =>
      httpClient
        .patch<W9Entity>(`/api/v1/contractors/${id}/w9`, options)
        .then(r => r.data),

    /** Get W9 information for a contractor. */

    showW9Information: ({ id, include_ssn }: ShowW9InformationOptions) =>
      httpClient
        .get<W9Entity>(`/api/v1/contractors/${id}/w9`, {
          include_ssn,
        })
        .then(r => r.data),

    /** Submit W9 information for a contractor you only want to create a 1099 for. This will also trigger an instant TIN check for the contractor. This contractor won't be able to accept payments, if you need them to receive payments use the KYC endpoint */

    submitW9Information: ({ id, ...options }: SubmitW9InformationOptions) =>
      httpClient
        .post<W9Entity>(`/api/v1/contractors/${id}/w9`, options)
        .then(r => r.data),

    /** Submit KYC (know your customer) information for a contractor */

    submitKYCInformation: ({ id, ...options }: SubmitKYCInformationOptions) =>
      httpClient
        .post<BusinessRelationshipEntity>(
          `/api/v1/contractors/${id}/kyc`,
          options,
        )
        .then(r => r.data),

    /** Delivers a secure onboarding email invitation to an existing contractor who has never been paid. If the contractor has an outstanding unaccepted invitation, the old invitation will be invalidated. */

    sendInviteToContractor: ({
      id,
      ...options
    }: SendInviteToContractorOptions) =>
      httpClient
        .post<BusinessRelationshipEntity>(
          `/api/v1/contractors/${id}/invite`,
          options,
        )
        .then(r => r.data),

    /** Add a bank account to an existing contractor. */

    addAccountToContractor: ({
      contractor_id,
      ...options
    }: AddAccountToContractorOptions) =>
      httpClient
        .post<AccountEntity>(
          `/api/v1/contractors/${contractor_id}/accounts`,
          options,
        )
        .then(r => r.data),

    /** List all accounts for the contractor. */

    listContractorAccounts: ({
      page,
      per_page,
      offset,
      contractor_id,
    }: ListContractorAccountsOptions) =>
      httpClient
        .get<AccountEntity[]>(`/api/v1/contractors/${contractor_id}/accounts`, {
          page,
          per_page,
          offset,
        })
        .then(r => r.data),

    /** Deactivate contractor's bank account. */

    deactivateAccount: ({ id, contractor_id }: DeactivateAccountOptions) =>
      httpClient
        .delete<AccountEntity>(
          `/api/v1/contractors/${contractor_id}/accounts/${id}`,
        )
        .then(r => r.data),

    /** Get details of an existing bank account. */

    getAccountDetail: ({ id, contractor_id }: GetAccountDetailOptions) =>
      httpClient
        .get<AccountEntity>(
          `/api/v1/contractors/${contractor_id}/accounts/${id}`,
        )
        .then(r => r.data),

    /** Add debit card to contractor */

    addContractorDebitCard: ({
      contractor_id,
      ...options
    }: AddContractorDebitCardOptions) =>
      httpClient
        .post<AccountEntity>(
          `/api/v1/contractors/${contractor_id}/cards`,
          options,
        )
        .then(r => r.data),

    /** Upload identity document */

    createContractorsIdentityDocument: ({
      contractor_id,
      ...options
    }: CreateContractorsIdentityDocumentOptions) =>
      httpClient
        .post<AccountEntity>(
          `/api/v1/contractors/${contractor_id}/identity_document`,
          options,
        )
        .then(r => r.data),
  };
}
