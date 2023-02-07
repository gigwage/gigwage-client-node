import { GigWageHttpClient } from "../http-client";
import { postApiV11099s, patchApiV11099s, Ten99Entity } from "../endpoints/entities";
export type Create1099Options =   postApiV11099s
export type List1099sOptions = {
      //** Page offset to fetch. */
  page?:number
  
      //** Number of results to return per page. */
  per_page?:number
  
      //** Pad a number of results. */
  offset?:number
  
}
export type Update1099Options = {
      
  id:number
  
} & patchApiV11099s
export type Delete1099Options = {
      
  id:number
  
}
export type Show1099Options = {
      
  id:number
  
}
export type Get1099PDFURLOptions = {
      
  id:number
  
}
export type Submit1099toIRSOptions = {
      
  id:number
  
}
export type Approve1099Options = {
      
  id:number
  
}

export default function ten99sEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Create a 1099 for a contractor. */
    Create1099: ({ ...options}: Create1099Options)=> httpClient.post<Ten99Entity>(`/api/v1/1099s`, options),
    /** Returns a list of 1099s, sorted newest-first. */
    List1099s: ({ page, per_page, offset, ...options}: List1099sOptions)=> httpClient.get<Ten99Entity[]>(`/api/v1/1099s`),
    /** Update a 1099 */
    Update1099: ({ id, ...options}: Update1099Options)=> httpClient.patch<Ten99Entity>(`/api/v1/1099s/${id}`, options),
    /** Delete a 1099. */
    Delete1099: ({ id, ...options}: Delete1099Options)=> httpClient.delete<Ten99Entity>(`/api/v1/1099s/${id}`),
    /** Get details of a 1099. */
    Show1099: ({ id, ...options}: Show1099Options)=> httpClient.get<Ten99Entity>(`/api/v1/1099s/${id}`),
    /** Returns the URL to a PDF of a submitted 1099. The URL expires in 1 hour. */
    Get1099PDFURL: ({ id, ...options}: Get1099PDFURLOptions)=> httpClient.get<>(`/api/v1/1099s/${id}/retrieve`),
    /** Submit 1099 to the IRS. */
    Submit1099toIRS: ({ id, ...options}: Submit1099toIRSOptions)=> httpClient.post<Ten99Entity>(`/api/v1/1099s/${id}/submit`, options),
    /** Mark 1099 as ready to submit to the IRS. */
    Approve1099: ({ id, ...options}: Approve1099Options)=> httpClient.post<Ten99Entity>(`/api/v1/1099s/${id}/approve`, options),
    }
}
