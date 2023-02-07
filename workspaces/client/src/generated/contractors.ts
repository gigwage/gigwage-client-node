import {
  AccountEntity,
  BusinessRelationshipEntity,
  ContractorInvitationEntity,
  Ten99Entity,
  W9Entity,
  patchApiV1Contractors,
  patchApiV1ContractorsIdW9,
  postApiV1Contractors,
  postApiV1ContractorsContractorIdAccounts,
  postApiV1ContractorsContractorIdCards,
  postApiV1ContractorsContractorIdIdentityDocument,
  postApiV1ContractorsIdKyc,
  postApiV1ContractorsIdW9,
} from '../endpoints/entities';
import { GigWageHttpClient } from '../http-client';
export type FindcontractoruniquelyOptions = {
  //** Contractor email address */
  email?: string;

  //** Customer assigned ID */
  external_id?: string;

  //** Contractor ID */
  id?: string;
};
export type CreatecontractorOptions = postApiV1Contractors;
export type ListcontractorsOptions = {
  //** Pad a number of results. */
  offset?: number;

  //** Page offset to fetch. */
  page?: number;

  //** Number of results to return per page. */
  per_page?: number;

  //** Search query to find contractors */
  q?: string;
};
export type InviteacontractorOptions = {
  id: number;
};
export type UpdateacontractorOptions = {
  id: number;
} & patchApiV1Contractors;
export type DeleteacontractorOptions = {
  id: number;
};
export type ReturnacontractorOptions = {
  //** set 1 to return full information of contractor (including Address, phone number, and birthday) */
  full?: string;

  id: number;

  //** set 1 to return security number of contractor */
  include_ssn?: string;
};
export type Listall1099sforacontractorOptions = {
  id: number;

  //** Pad a number of results. */
  offset?: number;

  //** Page offset to fetch. */
  page?: number;

  //** Number of results to return per page. */
  per_page?: number;

  year?: string;
};
export type CreateaTINcheckOptions = {
  id: number;
};
export type UpdateW9informationOptions = {
  id: number;
} & patchApiV1ContractorsIdW9;
export type ShowW9informationOptions = {
  id: number;

  //** set true to include social security */
  include_ssn?: string;
};
export type SubmitW9informationOptions = {
  id: number;
} & postApiV1ContractorsIdW9;
export type SubmitKYCinformationOptions = {
  id: number;
} & postApiV1ContractorsIdKyc;
export type SendinvitetocontractorOptions = {
  id: number;
};
export type AddaccounttocontractorOptions = {
  contractor_id: number;
} & postApiV1ContractorsContractorIdAccounts;
export type ListcontractoraccountsOptions = {
  contractor_id: number;

  //** Pad a number of results. */
  offset?: number;

  //** Page offset to fetch. */
  page?: number;

  //** Number of results to return per page. */
  per_page?: number;
};
export type DeactivateaccountOptions = {
  contractor_id: number;

  //** Account ID */
  id: number;
};
export type GetaccountdetailOptions = {
  contractor_id: number;

  //** Account ID */
  id: number;
};
export type AddcontractordebitcardOptions = {
  contractor_id: number;
} & postApiV1ContractorsContractorIdCards;
export type CreatecontractorsidentitydocumentOptions = {
  contractor_id: number;
} & postApiV1ContractorsContractorIdIdentityDocument;

export default function contractorsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Find a contractor by email, external_id or id. */
    Findcontractoruniquely: ({
      email,
      external_id,
      id,
      ...options
    }: FindcontractoruniquelyOptions) =>
      httpClient.get<BusinessRelationshipEntity>(`/api/v1/contractors/find_by`),
    /** Creates a new contractor. */
    Createcontractor: ({ ...options }: CreatecontractorOptions) =>
      httpClient.post<BusinessRelationshipEntity>(
        `/api/v1/contractors`,
        options,
      ),
    /** List contractors. */
    Listcontractors: ({
      q,
      page,
      per_page,
      offset,
      ...options
    }: ListcontractorsOptions) =>
      httpClient.get<BusinessRelationshipEntity[]>(`/api/v1/contractors`),
    /** Provides invitation information for the contractor to allow you to send the contractoran onboarding email. If the contractor has an outstanding, unaccepted invitation, the old invitation will be invalidated. */
    Inviteacontractor: ({ id, ...options }: InviteacontractorOptions) =>
      httpClient.post<ContractorInvitationEntity>(
        `/api/v1/contractors/${id}/invitations`,
        options,
      ),
    /** Updates an existing contractor. If the contractor has already registered, changes to the email address will not affect email delivery. Emails will be delivered to the address managed by the contractor. Any supported attributes not supplied in the request will not be changed. */
    Updateacontractor: ({ id, ...options }: UpdateacontractorOptions) =>
      httpClient.patch<BusinessRelationshipEntity>(
        `/api/v1/contractors/${id}`,
        options,
      ),
    /** Delete contractor record. Note: You can only destroy new contractors that aren't associated with other businesses or that have payments or 1099s  */
    Deleteacontractor: ({ id, ...options }: DeleteacontractorOptions) =>
      httpClient.delete<BusinessRelationshipEntity>(
        `/api/v1/contractors/${id}`,
      ),
    /** Returns the details for a given contractor. */
    Returnacontractor: ({
      id,
      full,
      include_ssn,
      ...options
    }: ReturnacontractorOptions) =>
      httpClient.get<BusinessRelationshipEntity>(`/api/v1/contractors/${id}`),
    /** List all 1099s for a contractor */
    Listall1099sforacontractor: ({
      id,
      page,
      per_page,
      offset,
      year,
      ...options
    }: Listall1099sforacontractorOptions) =>
      httpClient.get<Ten99Entity[]>(`/api/v1/contractors/${id}/1099s`),
    /** Verify a contractor's TIN is valid. Note: TIN checks are automatically run on POST and PATCH W9 endpoints */
    CreateaTINcheck: ({ id, ...options }: CreateaTINcheckOptions) =>
      httpClient.post<W9Entity>(`/api/v1/contractors/${id}/tin_check`, options),
    /** Update W9 information for a contractor. */
    UpdateW9information: ({ id, ...options }: UpdateW9informationOptions) =>
      httpClient.patch<W9Entity>(`/api/v1/contractors/${id}/w9`, options),
    /** Get W9 information for a contractor. */
    ShowW9information: ({
      id,
      include_ssn,
      ...options
    }: ShowW9informationOptions) =>
      httpClient.get<W9Entity>(`/api/v1/contractors/${id}/w9`),
    /** Submit W9 information for a contractor you only want to create a 1099 for. This will also trigger an instant TIN check for the contractor. This contractor won't be able to accept payments, if you need them to receive payments use the KYC endpoint */
    SubmitW9information: ({ id, ...options }: SubmitW9informationOptions) =>
      httpClient.post<W9Entity>(`/api/v1/contractors/${id}/w9`, options),
    /** Submit KYC (know your customer) information for a contractor */
    SubmitKYCinformation: ({ id, ...options }: SubmitKYCinformationOptions) =>
      httpClient.post<BusinessRelationshipEntity>(
        `/api/v1/contractors/${id}/kyc`,
        options,
      ),
    /** Delivers a secure onboarding email invitation to an existing contractor who has never been paid. If the contractor has an outstanding unaccepted invitation, the old invitation will be invalidated. */
    Sendinvitetocontractor: ({
      id,
      ...options
    }: SendinvitetocontractorOptions) =>
      httpClient.post<BusinessRelationshipEntity>(
        `/api/v1/contractors/${id}/invite`,
        options,
      ),
    /** Add a bank account to an existing contractor. */
    Addaccounttocontractor: ({
      contractor_id,
      ...options
    }: AddaccounttocontractorOptions) =>
      httpClient.post<AccountEntity>(
        `/api/v1/contractors/${contractor_id}/accounts`,
        options,
      ),
    /** List all accounts for the contractor. */
    Listcontractoraccounts: ({
      page,
      per_page,
      offset,
      contractor_id,
      ...options
    }: ListcontractoraccountsOptions) =>
      httpClient.get<AccountEntity[]>(
        `/api/v1/contractors/${contractor_id}/accounts`,
      ),
    /** Deactivate contractor's bank account. */
    Deactivateaccount: ({
      id,
      contractor_id,
      ...options
    }: DeactivateaccountOptions) =>
      httpClient.delete<AccountEntity>(
        `/api/v1/contractors/${contractor_id}/accounts/${id}`,
      ),
    /** Get details of an existing bank account. */
    Getaccountdetail: ({
      id,
      contractor_id,
      ...options
    }: GetaccountdetailOptions) =>
      httpClient.get<AccountEntity>(
        `/api/v1/contractors/${contractor_id}/accounts/${id}`,
      ),
    /** Add debit card to contractor */
    Addcontractordebitcard: ({
      contractor_id,
      ...options
    }: AddcontractordebitcardOptions) =>
      httpClient.post<AccountEntity>(
        `/api/v1/contractors/${contractor_id}/cards`,
        options,
      ),
    /** Upload identity document */
    Createcontractorsidentitydocument: ({
      contractor_id,
      ...options
    }: CreatecontractorsidentitydocumentOptions) =>
      httpClient.post<AccountEntity>(
        `/api/v1/contractors/${contractor_id}/identity_document`,
        options,
      ),
  };
}
