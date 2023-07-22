import { GigWageHttpClient } from '../http-client';

import {
  AccountEntity,
  BusinessRelationshipEntity,
  ContractorInvitationEntity,
  PatchApiV1BusinessesBusinessIdContractors,
  PatchApiV1BusinessesBusinessIdContractorsIdW9,
  PostApiV1BusinessesBusinessIdContractors,
  PostApiV1BusinessesBusinessIdContractorsBatch,
  PostApiV1BusinessesBusinessIdContractorsContractorIdAccounts,
  PostApiV1BusinessesBusinessIdContractorsContractorIdCards,
  PostApiV1BusinessesBusinessIdContractorsContractorIdIdentityDocument,
  PostApiV1BusinessesBusinessIdContractorsIdKyc,
  PostApiV1BusinessesBusinessIdContractorsIdW9,
  Ten99Entity,
  W9Entity,
} from './types';

export type FindContractorUniquelyPartnershipsOptions = {
  /** Contractor email address */
  email?: string;
  /** Customer assigned ID */
  external_id?: string;
  /** Contractor ID */
  id?: string;
  business_id: number;
};

export type CreateContractorPartnershipsOptions = {
  business_id: number;
} & PostApiV1BusinessesBusinessIdContractorsBatch;

export type CreateContractorPartnershipsOptions = {
  business_id: number;
} & PostApiV1BusinessesBusinessIdContractors;

export type ListContractorsPartnershipsOptions = {
  /** Search query to find contractors */
  q?: string;
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  business_id: number;
};

export type InviteAContractorPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type UpdateAContractorPartnershipsOptions = {
  id: number;
  business_id: number;
} & PatchApiV1BusinessesBusinessIdContractors;

export type DeleteAContractorPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type ReturnAContractorPartnershipsOptions = {
  id: number;
  /** set 1 to return full information of contractor (including Address, phone number, and birthday) */
  full?: string;
  /** set 1 to return security number of contractor */
  include_ssn?: string;
  business_id: number;
};

export type ListAll1099sForAContractorPartnershipsOptions = {
  id: number;
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  year?: string;
  business_id: number;
};

export type CreateATINCheckPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type UpdateW9InformationPartnershipsOptions = {
  id: number;
  business_id: number;
} & PatchApiV1BusinessesBusinessIdContractorsIdW9;

export type ShowW9InformationPartnershipsOptions = {
  id: number;
  /** set true to include social security */
  include_ssn?: string;
  business_id: number;
};

export type SubmitW9InformationPartnershipsOptions = {
  id: number;
  business_id: number;
} & PostApiV1BusinessesBusinessIdContractorsIdW9;

export type SubmitKYCInformationPartnershipsOptions = {
  id: number;
  business_id: number;
} & PostApiV1BusinessesBusinessIdContractorsIdKyc;

export type SendInviteToContractorPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type AddAccountToContractorPartnershipsOptions = {
  business_id: number;
  contractor_id: number;
} & PostApiV1BusinessesBusinessIdContractorsContractorIdAccounts;

export type ListContractorAccountsPartnershipsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  business_id: number;
  contractor_id: number;
};

export type DeactivateAccountPartnershipsOptions = {
  /** Account ID */
  id: number;
  business_id: number;
  contractor_id: number;
};

export type GetAccountDetailPartnershipsOptions = {
  /** Account ID */
  id: number;
  business_id: number;
  contractor_id: number;
};

export type AddContractorDebitCardPartnershipsOptions = {
  business_id: number;
  contractor_id: number;
} & PostApiV1BusinessesBusinessIdContractorsContractorIdCards;

export type CreateContractorsIdentityDocumentPartnershipsOptions = {
  contractor_id: number;
  business_id: number;
} & PostApiV1BusinessesBusinessIdContractorsContractorIdIdentityDocument;

export function contractorsPartnershipsEndpoints(
  httpClient: GigWageHttpClient,
) {
  return {
    /** Find a contractor by email, external_id or id. */
    findContractorUniquely: ({
      email,
      external_id,
      id,
      business_id,
    }: FindContractorUniquelyPartnershipsOptions): Promise<{
      contractor: BusinessRelationshipEntity;
    }> =>
      httpClient
        .get<{ contractor: BusinessRelationshipEntity }>(
          `/api/v1/businesses/${business_id}/contractors/find_by`,
          {
            email,
            external_id,
            id,
          },
        )
        .then(r => r.data),

    /** Creates a new contractor. */
    createContractor: ({
      business_id,
      ...options
    }: CreateContractorPartnershipsOptions): Promise<{
      contractors: BusinessRelationshipEntity;
    }> =>
      httpClient
        .post<{ contractors: BusinessRelationshipEntity }>(
          `/api/v1/businesses/${business_id}/contractors/batch`,
          options,
        )
        .then(r => r.data),

    /** Creates a new contractor. */
    createContractor: ({
      business_id,
      ...options
    }: CreateContractorPartnershipsOptions): Promise<{
      contractor: BusinessRelationshipEntity;
    }> =>
      httpClient
        .post<{ contractor: BusinessRelationshipEntity }>(
          `/api/v1/businesses/${business_id}/contractors`,
          options,
        )
        .then(r => r.data),

    /** List contractors. */
    listContractors: ({
      q,
      page,
      per_page,
      offset,
      business_id,
    }: ListContractorsPartnershipsOptions): Promise<{
      contractors: BusinessRelationshipEntity[];
    }> =>
      httpClient
        .get<{ contractors: BusinessRelationshipEntity[] }>(
          `/api/v1/businesses/${business_id}/contractors`,
          {
            q,
            page,
            per_page,
            offset,
          },
        )
        .then(r => r.data),

    /** Provides invitation information for the contractor to allow you to send the contractoran onboarding email. If the contractor has an outstanding, unaccepted invitation, the old invitation will be invalidated. */
    inviteAContractor: ({
      id,
      business_id,
      ...options
    }: InviteAContractorPartnershipsOptions): Promise<{
      invitation: ContractorInvitationEntity;
    }> =>
      httpClient
        .post<{ invitation: ContractorInvitationEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}/invitations`,
          options,
        )
        .then(r => r.data),

    /** Updates an existing contractor. If the contractor has already registered, changes to the email address will not affect email delivery. Emails will be delivered to the address managed by the contractor. Any supported attributes not supplied in the request will not be changed. */
    updateAContractor: ({
      id,
      business_id,
      ...options
    }: UpdateAContractorPartnershipsOptions): Promise<{
      contractor: BusinessRelationshipEntity;
    }> =>
      httpClient
        .patch<{ contractor: BusinessRelationshipEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}`,
          options,
        )
        .then(r => r.data),

    /** Delete contractor record. Note: You can only destroy new contractors that aren't associated with other businesses or that have payments or 1099s  */
    deleteAContractor: ({
      id,
      business_id,
    }: DeleteAContractorPartnershipsOptions): Promise<{
      contractor: BusinessRelationshipEntity;
    }> =>
      httpClient
        .delete<{ contractor: BusinessRelationshipEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}`,
        )
        .then(r => r.data),

    /** Returns the details for a given contractor. */
    returnAContractor: ({
      id,
      full,
      include_ssn,
      business_id,
    }: ReturnAContractorPartnershipsOptions): Promise<{
      contractor: BusinessRelationshipEntity;
    }> =>
      httpClient
        .get<{ contractor: BusinessRelationshipEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}`,
          {
            full,
            include_ssn,
          },
        )
        .then(r => r.data),

    /** List all 1099s for a contractor */
    listAll1099sForAContractor: ({
      id,
      page,
      per_page,
      offset,
      year,
      business_id,
    }: ListAll1099sForAContractorPartnershipsOptions): Promise<{
      '1099s': Ten99Entity[];
    }> =>
      httpClient
        .get<{ '1099s': Ten99Entity[] }>(
          `/api/v1/businesses/${business_id}/contractors/${id}/1099s`,
          {
            page,
            per_page,
            offset,
            year,
          },
        )
        .then(r => r.data),

    /** Verify a contractor's TIN is valid. Note: TIN checks are automatically run on POST and PATCH W9 endpoints */
    createATINCheck: ({
      id,
      business_id,
      ...options
    }: CreateATINCheckPartnershipsOptions): Promise<{ contractor: W9Entity }> =>
      httpClient
        .post<{ contractor: W9Entity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}/tin_check`,
          options,
        )
        .then(r => r.data),

    /** Update W9 information for a contractor. */
    updateW9Information: ({
      id,
      business_id,
      ...options
    }: UpdateW9InformationPartnershipsOptions): Promise<{
      contractor: W9Entity;
    }> =>
      httpClient
        .patch<{ contractor: W9Entity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}/w9`,
          options,
        )
        .then(r => r.data),

    /** Get W9 information for a contractor. */
    showW9Information: ({
      id,
      include_ssn,
      business_id,
    }: ShowW9InformationPartnershipsOptions): Promise<{
      contractor: W9Entity;
    }> =>
      httpClient
        .get<{ contractor: W9Entity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}/w9`,
          {
            include_ssn,
          },
        )
        .then(r => r.data),

    /** Submit W9 information for a contractor you only want to create a 1099 for. This will also trigger an instant TIN check for the contractor. This contractor won't be able to accept payments, if you need them to receive payments use the KYC endpoint */
    submitW9Information: ({
      id,
      business_id,
      ...options
    }: SubmitW9InformationPartnershipsOptions): Promise<{
      contractor: W9Entity;
    }> =>
      httpClient
        .post<{ contractor: W9Entity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}/w9`,
          options,
        )
        .then(r => r.data),

    /** Submit KYC (know your customer) information for a contractor */
    submitKYCInformation: ({
      id,
      business_id,
      ...options
    }: SubmitKYCInformationPartnershipsOptions): Promise<{
      contractor: BusinessRelationshipEntity;
    }> =>
      httpClient
        .post<{ contractor: BusinessRelationshipEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}/kyc`,
          options,
        )
        .then(r => r.data),

    /** Delivers a secure onboarding email invitation to an existing contractor who has never been paid. If the contractor has an outstanding unaccepted invitation, the old invitation will be invalidated. */
    sendInviteToContractor: ({
      id,
      business_id,
      ...options
    }: SendInviteToContractorPartnershipsOptions): Promise<{
      contractor: BusinessRelationshipEntity;
    }> =>
      httpClient
        .post<{ contractor: BusinessRelationshipEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${id}/invite`,
          options,
        )
        .then(r => r.data),

    /** Add a bank account to an existing contractor. */
    addAccountToContractor: ({
      business_id,
      contractor_id,
      ...options
    }: AddAccountToContractorPartnershipsOptions): Promise<{
      account: AccountEntity;
    }> =>
      httpClient
        .post<{ account: AccountEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${contractor_id}/accounts`,
          options,
        )
        .then(r => r.data),

    /** List all accounts for the contractor. */
    listContractorAccounts: ({
      page,
      per_page,
      offset,
      business_id,
      contractor_id,
    }: ListContractorAccountsPartnershipsOptions): Promise<{
      accounts: AccountEntity[];
    }> =>
      httpClient
        .get<{ accounts: AccountEntity[] }>(
          `/api/v1/businesses/${business_id}/contractors/${contractor_id}/accounts`,
          {
            page,
            per_page,
            offset,
          },
        )
        .then(r => r.data),

    /** Deactivate contractor's bank account. */
    deactivateAccount: ({
      id,
      business_id,
      contractor_id,
    }: DeactivateAccountPartnershipsOptions): Promise<{
      account: AccountEntity;
    }> =>
      httpClient
        .delete<{ account: AccountEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${contractor_id}/accounts/${id}`,
        )
        .then(r => r.data),

    /** Get details of an existing bank account. */
    getAccountDetail: ({
      id,
      business_id,
      contractor_id,
    }: GetAccountDetailPartnershipsOptions): Promise<{
      account: AccountEntity;
    }> =>
      httpClient
        .get<{ account: AccountEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${contractor_id}/accounts/${id}`,
        )
        .then(r => r.data),

    /** Add debit card to contractor */
    addContractorDebitCard: ({
      business_id,
      contractor_id,
      ...options
    }: AddContractorDebitCardPartnershipsOptions): Promise<{
      account: AccountEntity;
    }> =>
      httpClient
        .post<{ account: AccountEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${contractor_id}/cards`,
          options,
        )
        .then(r => r.data),

    /** Upload identity document */
    createContractorsIdentityDocument: ({
      contractor_id,
      business_id,
      ...options
    }: CreateContractorsIdentityDocumentPartnershipsOptions): Promise<{
      identity_document: AccountEntity;
    }> =>
      httpClient
        .post<{ identity_document: AccountEntity }>(
          `/api/v1/businesses/${business_id}/contractors/${contractor_id}/identity_document`,
          options,
        )
        .then(r => r.data),
  };
}
