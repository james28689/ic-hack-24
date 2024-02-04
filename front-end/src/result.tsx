interface Result {
    top_5_visited: { website: string, visits: number }[];
    top_10_search_terms: { term: string, count: number }[];
    num_forgot_incognito: number;
}

export default Result;