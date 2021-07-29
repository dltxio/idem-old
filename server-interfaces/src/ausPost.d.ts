declare namespace server {
  type AusPostRequest = {
    given_name: string;
    middle_name: string | undefined;
    family_name: string;
    dob: string | undefined;
    address: Address;
    consent: string | undefined;
  };

  type Address = {
    unit_number: string | undefined;
    street_name: string;
    street_number: string;
    street_type: string;
    locality: string;
    region: string;
    postal_code: string;
    country: string;
  };

  type AusPostResponse = {
    verification_status: string;
    verification_session_token: string;
    data_source_events: string[];
    watchlist: WatchList;
    found_sources: FoundSources;
    sources_category: string;
    transaction_id: string;
  };

  type WatchList = {
    check_performed: boolean;
    check_performed_date: string;
    found: boolean;
  };

  type FoundSources = {
    name: string;
    category: string;
  };
}
